import Head from "next/head";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-500 to-blue-700">
      <Head>
        <title>Welcome to Verify Email Login App</title>
      </Head>

      <h1 className="text-4xl text-white mb-4">
        Welcome to Verify Email Login App
      </h1>
      <hr className="w-full max-w-md border-white mb-4" />
    </main>
  );
}
