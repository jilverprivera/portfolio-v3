// import { Hero } from "@/components/hero";
import { AboutContainer } from "@/features/home/components/about.container";
import { ProjectsContainer } from "@/features/home/components/projects.container";
import { HomeContainer } from "@/features/home/components/home.container";

export default function Home() {
  return (
    <>
      {/* <Hero /> */}
      <HomeContainer />
      <AboutContainer />
      <ProjectsContainer />
    </>
  );
}
