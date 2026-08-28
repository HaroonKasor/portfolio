import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/Button";

// next/link needs no router in this suite; a plain anchor keeps the assertion
// about *which element type* the Button chose, which is what the spec cares about.
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  } & Record<string, unknown>) => (
    <a href={href} data-nextlink="true" {...rest}>
      {children}
    </a>
  ),
}));

afterEach(cleanup);

describe("Button element choice", () => {
  it("renders an <a> for an http href", () => {
    render(
      <Button variant="accent" href="https://github.com/HaroonKasor">
        GitHub
      </Button>,
    );
    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link.tagName).toBe("A");
    expect(link).not.toHaveAttribute("data-nextlink");
  });

  it("opens an http href in a new tab with rel=noopener", () => {
    render(
      <Button variant="ghost" href="https://example.com">
        External
      </Button>,
    );
    const link = screen.getByRole("link", { name: "External" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
  });

  it("renders a next/link for an internal href", () => {
    render(
      <Button variant="accent" href="/projects/goskillup-lms">
        Project
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Project" });
    expect(link).toHaveAttribute("data-nextlink", "true");
    expect(link).toHaveAttribute("href", "/projects/goskillup-lms");
    expect(link).not.toHaveAttribute("target");
  });

  it("renders a next/link for a hash href", () => {
    render(
      <Button variant="accent" href="#work">
        Work
      </Button>,
    );
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
      "data-nextlink",
      "true",
    );
  });

  it("renders a plain <a> for a mailto href without target=_blank", () => {
    render(
      <Button variant="ghost" href="mailto:haroonkasor.dev@gmail.com">
        Email
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Email" });
    expect(link).not.toHaveAttribute("data-nextlink");
    expect(link).not.toHaveAttribute("target");
  });

  it("renders a <button> when no href is given", () => {
    render(<Button variant="dark">Press</Button>);
    const button = screen.getByRole("button", { name: "Press" });
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
  });

  it("honours an explicit target/rel override on an external href", () => {
    render(
      <Button variant="ghost" href="https://example.com" target="_self" rel="me">
        Same tab
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Same tab" });
    expect(link).toHaveAttribute("target", "_self");
    expect(link).toHaveAttribute("rel", "me");
  });
});

describe("Button variants and sizes", () => {
  it("applies accent variant classes", () => {
    render(<Button variant="accent">Accent</Button>);
    const button = screen.getByRole("button", { name: "Accent" });
    expect(button.className).toContain("bg-accent");
    expect(button.className).toContain("text-white");
  });

  it("applies ghost variant classes", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button", { name: "Ghost" });
    expect(button.className).toContain("border-line");
    expect(button.className).toContain("bg-transparent");
  });

  it("applies dark variant classes", () => {
    render(<Button variant="dark">Dark</Button>);
    const button = screen.getByRole("button", { name: "Dark" });
    expect(button.className).toContain("bg-inverse");
    expect(button.className).toContain("text-on-inverse");
  });

  it("defaults to the md size", () => {
    render(<Button variant="accent">Md</Button>);
    expect(screen.getByRole("button", { name: "Md" }).className).toContain("h-11");
  });

  it("applies lg size classes when size=lg", () => {
    render(
      <Button variant="accent" size="lg">
        Lg
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Lg" }).className).toContain("h-14");
  });

  it("appends a custom className", () => {
    render(
      <Button variant="accent" className="custom-x">
        Custom
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Custom" }).className).toContain(
      "custom-x",
    );
  });

  it("meets the 44px minimum touch target via min-h-11", () => {
    render(<Button variant="accent">Touch</Button>);
    expect(screen.getByRole("button", { name: "Touch" }).className).toContain(
      "min-h-11",
    );
  });
});

describe("Button disabled state", () => {
  it("marks the button disabled", () => {
    render(
      <Button variant="accent" disabled>
        Disabled
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });

  it("does not fire onClick while disabled", () => {
    const onClick = vi.fn();
    render(
      <Button variant="accent" disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    screen.getByRole("button", { name: "Disabled" }).click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("fires onClick when enabled", () => {
    const onClick = vi.fn();
    render(
      <Button variant="accent" onClick={onClick}>
        Enabled
      </Button>,
    );
    screen.getByRole("button", { name: "Enabled" }).click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("Button icon rendering", () => {
  it("hides the icon from the accessibility tree", () => {
    render(
      <Button variant="accent" icon={<svg data-testid="icon" />}>
        With icon
      </Button>,
    );
    const icon = screen.getByTestId("icon");
    expect(icon.parentElement).toHaveAttribute("aria-hidden");
    expect(screen.getByRole("button", { name: "With icon" })).toBeInTheDocument();
  });

  it("places the icon after the label when iconRight is set", () => {
    render(
      <Button variant="accent" icon={<svg data-testid="icon" />} iconRight>
        Label
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Label" });
    const iconWrapper = screen.getByTestId("icon").parentElement!;
    expect(button.lastElementChild).toBe(iconWrapper);
  });

  it("uses an explicit aria-label when provided", () => {
    render(
      <Button variant="accent" aria-label="Open menu">
        ...
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });
});
