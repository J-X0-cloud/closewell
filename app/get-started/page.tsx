import type { Metadata } from "next";
import { DemoForm } from "@/components/demo/DemoForm";
import { DemoIntro } from "@/components/demo/DemoIntro";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Thirty minutes with a finance lead. Bring one account that eats your close week and we’ll reconcile it live, with every step cited.",
};

export default function GetStartedPage() {
  return (
    <section className="demo">
      <div className="container demo__grid">
        <DemoIntro />
        <DemoForm />
      </div>
    </section>
  );
}
