import Features from "@/components/features-horizontal";
import Section from "@/components/landing/section";
import { BarChart3, Brain, FileText, LineChart } from "lucide-react";

const data = [
  {
    id: 1,
    title: "AI-Powered Dashboard",
    content: "Visualize trends and gain insights at a glance.",
    image: "/PawThera.jpeg",
    icon: <BarChart3 className="h-6 w-6 text-secondary" />,
  },
  {
    id: 2,
    title: "Natural Language Processing",
    content: "Analyze text and extract sentiment effortlessly.",
    image: "/PawThera.jpeg",
    icon: <Brain className="h-6 w-6 text-secondary" />,
  },
  {
    id: 3,
    title: "Predictive Analytics",
    content: "Forecast trends and make data-driven decisions.",
    image: "/PawThera.jpeg",
    icon: <LineChart className="h-6 w-6 text-secondary" />,
  },
  {
    id: 4,
    title: "Automated Reporting",
    content: "Generate comprehensive reports with one click.",
    image: "/PawThera.jpeg",
    icon: <FileText className="h-6 w-6 text-secondary" />,
  },
];

export default function Solution() {
  return (
    <Section title="Solution" subtitle="La solution pour résoudre vos problèmes">
      <Features collapseDelay={5000} linePosition="bottom" data={data} />
    </Section>
  );
}