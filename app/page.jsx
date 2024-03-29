import Feed from '@/components/Feed'

export const revalidate=0 // or low number
export const dynamic = "force-dynamic";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & share
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center"> AI-powered prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI tool for modern world to discover, create and share creative
      </p>

      <Feed />
    </section>
  )
}

export default Home