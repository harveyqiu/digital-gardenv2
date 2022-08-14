import Head from 'next/head';
import Spacer from '../components/Spacer';
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container mx-auto">
          <h1 className="md:text-6xl lg:text-8xl my-5 mx-12 px-8 pt-20">
            Harvey writes post about <br></br> failures and mistakes, <br></br> ups and downs.
          </h1>
          <h2 className="lg:text-5xl md:text-3xl m-8 mx-12 px-8">
              Law School Student, Tech Hobbist and Self-Learner
          </h2>
        </div>
        <Spacer />
        <div className="flex flex-row justify-around my-10">
          <button className="border-gray-100">
            <Link href="/articles">Articles</Link>
          </button>
          <button className="border-gray-100">
            Projects
          </button>
          <button className="border-gray-100">
            Grumbles
          </button>
        </div>
      </main>
    </div>
  )
}
