import { Suspense } from "react"
import { Image, Link, useMutation, Routes, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { MoralisProvider, useMoralis } from "react-moralis"

const UserDapp = () => {
  const { isAuthenticated, authenticate, user, logout } = useMoralis()
  const session = useSession()

  // session.$create({ username: user.get("username")})

  // console.log(session)

  if (!isAuthenticated) {
    return (
      <button
        onClick={() =>
          authenticate({
            type: "sol",
            signingMessage: "REO needs you to sign in in order to validate ownership... whatevs...",
          })
        }
      >
        Auth
      </button>
    )
  }

  return (
    <div>
      <p>Welcome {user.get("username")}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

const UserInfo = () => {
  const currentUser = useCurrentUser()
  // const [logoutMutation] = useMutation(logout)
  return <></>
  // if (currentUser) {
  //   return (
  //     <>
  //       <button
  //         className="button small"
  //         onClick={async () => {
  //           await logoutMutation()
  //         }}
  //       >
  //         Logout
  //       </button>
  //       <div>
  //         User id: <code>{currentUser.id}</code>
  //         <br />
  //         User role: <code>{currentUser.role}</code>
  //       </div>
  //     </>
  //   )
  // } else {
  //   return (
  //     <>
  //       <Link href={Routes.SignupPage()}>
  //         <a className="button small">
  //           <strong>Sign Up</strong>
  //         </a>
  //       </Link>
  //       <Link href={Routes.LoginPage()}>
  //         <a className="button small">
  //           <strong>Login</strong>
  //         </a>
  //       </Link>
  //     </>
  //   )
  // }
}

const Home = () => {
  return (
    <div className="container">
      <main>
        <div className="logo">🏡 Real Estate Offerings — invest in real-estate in fragments</div>
        <div
          className="buttons"
          style={{
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>

          <MoralisProvider
            appId={process.env.NEXT_PUBLIC_APP_ID}
            serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
          >
            <UserDapp />
          </MoralisProvider>
        </div>
        <p>
          <strong>
            To add a new model to your app, <br />
            run the following in your terminal:
          </strong>
        </p>
        <pre>
          <code>blitz generate all project name:string</code>
        </pre>
        <div
          style={{
            marginBottom: "1rem",
          }}
        >
          (And select Yes to run prisma migrate)
        </div>
        <div>
          <p>
            Then <strong>restart the server</strong>
          </p>
          <pre>
            <code>Ctrl + c</code>
          </pre>
          <pre>
            <code>blitz dev</code>
          </pre>
          <p>
            and go to{" "}
            <Link href="/projects">
              <a>/projects</a>
            </Link>
          </p>
        </div>
      </main>

      <footer>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Powered by the crazy ones.
        </a>
      </footer>

      <style jsx global src="https://cdn.tailwindcss.com">{``}</style>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
