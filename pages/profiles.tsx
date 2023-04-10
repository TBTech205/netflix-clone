import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import currentUser from "@/hooks/useCurrentUser"
import { useRouter } from "next/router"

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Profiles = () => {
  const router = useRouter();
  const { data: user } = currentUser();

  const openProfile = () => {
    router.push('/browse');
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col">
        <h1 className='text-3xl text-white font-bold center md:text-5xl'>Whos Watching?</h1>
        <div className="flex items-center justify-center gap-5 mt-8">
          
          <div onClick={openProfile}>
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img src="/images/default-blue.png" alt="Avatar1" className="w-full h-full object-cover" />
              </div>
              <div className="mt-1 text-center text-neutral-400 text-xl group-hover:text-white">
                <p>{user?.name}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Profiles