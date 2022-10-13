import Link from "next/link";
import LogoImage from "./logoImage";

export default function NavBar({ user }) {
  const navigation = [];

  if (user) {
    navigation.push({ name: "Dashboard", href: "/dashboard" });
    navigation.push({ name: "User Settings", href: "/settings" });
  }

  return (
    <>
      <header className="bg-indigo-600">
        <nav
          className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8"
          aria-label="Top"
        >
          <div className="flex items-center justify-between w-full py-6 border-b border-indigo-500 lg:border-none">
            <div className="flex items-center">
              <Link href={"/"}>
                <a>
                  <span className="sr-only">Rent My Background</span>
                  <LogoImage className="w-auto h-10" />
                </a>
              </Link>
              <div className="hidden ml-10 space-x-8 lg:block">
                {navigation.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <a className="text-base font-medium text-white hover:text-indigo-50">
                      {link.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            <div className="ml-10 space-x-4">
              {!user ? (
                <>
                  <Link href="/login">
                    <a className="inline-block px-4 py-2 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md hover:bg-opacity-75">
                      Sign in
                    </a>
                  </Link>
                  <Link href="/signup">
                    <a className="inline-block px-4 py-2 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md hover:bg-indigo-50">
                      Sign up
                    </a>
                  </Link>
                </>
              ) : (
                <Link href="/logout">
                  <a className="inline-block px-4 py-2 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md hover:bg-indigo-50">
                    Logout
                  </a>
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-wrap justify-center py-4 space-x-6 lg:hidden">
            {navigation.map((link) => (
              <Link key={link.name} href={link.href}>
                <a className="text-base font-medium text-white hover:text-indigo-50">
                  {link.name}
                </a>
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}
