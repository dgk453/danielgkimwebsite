import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import IconLogoCloud from "@/components/magicui/icon-cloud";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `IconCloud`.
 */
export type IconCloudProps = SliceComponentProps<Content.IconCloudSlice>;

/**
 * Component for "IconCloud" Slices.
 */
const IconCloud = ({ slice }: IconCloudProps): JSX.Element => {
  const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
  ];
  return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="mt-24"
        >
        <div className="bg-slate-50">
          <Bounded>
            <Heading size="lg" className="text-slate-900" as="h2">
              {slice.primary.heading}
            </Heading>
            <IconLogoCloud iconSlugs={slugs}></IconLogoCloud>
          </Bounded>
          
        </div>
      </section>
    
  );
};

export default IconCloud;
