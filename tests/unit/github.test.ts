import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { fallbackRepos, getRepos } from "@/lib/github";

type ApiRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  fork: boolean;
};

function apiRepo(overrides: Partial<ApiRepo> = {}): ApiRepo {
  return {
    name: "repo",
    description: "A repo",
    language: "TypeScript",
    stargazers_count: 3,
    html_url: "https://github.com/HaroonKasor/repo",
    fork: false,
    ...overrides,
  };
}

function mockJson(body: unknown, ok = true, status = 200) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  } as unknown as Response);
}

beforeEach(() => {
  vi.stubGlobal("fetch", mockJson([]));
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("getRepos happy path", () => {
  it("maps GitHub API JSON onto the Repo shape", async () => {
    vi.stubGlobal(
      "fetch",
      mockJson([
        apiRepo({
          name: "portfolio",
          description: "My site",
          language: "TypeScript",
          stargazers_count: 7,
          html_url: "https://github.com/HaroonKasor/portfolio",
        }),
      ]),
    );

    const repos = await getRepos();

    expect(repos).toEqual([
      {
        name: "portfolio",
        description: "My site",
        language: "TypeScript",
        stars: 7,
        url: "https://github.com/HaroonKasor/portfolio",
      },
    ]);
  });

  it("preserves null description and language", async () => {
    vi.stubGlobal(
      "fetch",
      mockJson([apiRepo({ name: "bare", description: null, language: null })]),
    );

    const [repo] = await getRepos();
    expect(repo.description).toBeNull();
    expect(repo.language).toBeNull();
  });

  it("requests the HaroonKasor user repos endpoint", async () => {
    const fetchMock = mockJson([apiRepo()]);
    vi.stubGlobal("fetch", fetchMock);

    await getRepos();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toContain(
      "https://api.github.com/users/HaroonKasor/repos",
    );
  });
});

describe("getRepos filtering", () => {
  it("filters out forks", async () => {
    vi.stubGlobal(
      "fetch",
      mockJson([
        apiRepo({ name: "mine", fork: false }),
        apiRepo({ name: "forked", fork: true }),
      ]),
    );

    const names = (await getRepos()).map((r) => r.name);
    expect(names).toEqual(["mine"]);
  });

  it("filters out the HaroonKasor.github.io pages repo", async () => {
    vi.stubGlobal(
      "fetch",
      mockJson([
        apiRepo({ name: "HaroonKasor.github.io" }),
        apiRepo({ name: "keeper" }),
      ]),
    );

    const names = (await getRepos()).map((r) => r.name);
    expect(names).toEqual(["keeper"]);
  });

  it("filters the pages repo case-insensitively", async () => {
    vi.stubGlobal(
      "fetch",
      mockJson([
        apiRepo({ name: "haroonkasor.github.io" }),
        apiRepo({ name: "keeper" }),
      ]),
    );

    const names = (await getRepos()).map((r) => r.name);
    expect(names).toEqual(["keeper"]);
  });

  it("limits the result to 4 repos", async () => {
    vi.stubGlobal(
      "fetch",
      mockJson(
        Array.from({ length: 6 }, (_, i) => apiRepo({ name: `repo-${i}` })),
      ),
    );

    const repos = await getRepos();
    expect(repos).toHaveLength(4);
    expect(repos.map((r) => r.name)).toEqual([
      "repo-0",
      "repo-1",
      "repo-2",
      "repo-3",
    ]);
  });

  it("falls back when every repo is filtered out", async () => {
    vi.stubGlobal("fetch", mockJson([apiRepo({ name: "forked", fork: true })]));
    expect(await getRepos()).toEqual(fallbackRepos);
  });
});

describe("getRepos failure handling", () => {
  it("returns fallbackRepos on a network error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("ECONNREFUSED")),
    );
    expect(await getRepos()).toEqual(fallbackRepos);
  });

  it("returns fallbackRepos on a 403 rate-limit response", async () => {
    vi.stubGlobal("fetch", mockJson({ message: "rate limited" }, false, 403));
    expect(await getRepos()).toEqual(fallbackRepos);
  });

  it("returns fallbackRepos on a 404 response", async () => {
    vi.stubGlobal("fetch", mockJson({ message: "Not Found" }, false, 404));
    expect(await getRepos()).toEqual(fallbackRepos);
  });

  it("returns fallbackRepos when the payload is not an array", async () => {
    vi.stubGlobal("fetch", mockJson({ message: "nope" }));
    expect(await getRepos()).toEqual(fallbackRepos);
  });

  it("returns fallbackRepos when the JSON body fails to parse", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => {
          throw new SyntaxError("Unexpected token");
        },
      } as unknown as Response),
    );
    expect(await getRepos()).toEqual(fallbackRepos);
  });
});

describe("fallbackRepos content", () => {
  it("matches the four repos named in the brief", () => {
    expect(fallbackRepos.map((r) => r.name)).toEqual([
      "portfolio",
      "ru-elearning",
      "expense-notify",
      "quake-alert",
    ]);
  });

  it("gives portfolio 2 stars and TypeScript as its language", () => {
    const portfolio = fallbackRepos.find((r) => r.name === "portfolio")!;
    expect(portfolio.stars).toBe(2);
    expect(portfolio.language).toBe("TypeScript");
  });

  it("points every fallback repo at github.com/HaroonKasor", () => {
    for (const repo of fallbackRepos) {
      expect(repo.url).toContain("github.com/HaroonKasor/");
    }
  });
});
