export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-500 to-blue-700">
      <h1 className="text-4xl text-white mb-4">Profile</h1>
      <hr className="w-full max-w-md border-white mb-4" />
      <p className="text-2xl text-white mb-4">
        Profile page
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}
