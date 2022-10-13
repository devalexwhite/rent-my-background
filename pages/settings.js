import DefaultLayout from "../layouts/default";

import AuthGate from "../components/authGate";
import { useEffect, useState } from "react";
import { defaultProfile, getUserProfile, updateUserProfile } from "../lib/user";
import LoadingIndicator from "../components/loadingIndicator";

export default function UserSettingsPage() {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);

  async function fetchUserProfile({ user }) {
    const profile = await getUserProfile({ user });
    if (profile) setProfile(profile);
    setLoading(false);
  }

  async function onSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setProfile(await updateUserProfile({ user, data: profile }));

    setLoading(false);
  }

  function handleChange(event) {
    const { id, value } = event.target;
    setProfile((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  useEffect(() => {
    if (user) {
      setLoading(true);

      setProfile({
        ...profile,
        email: user.email,
      });

      fetchUserProfile({ user });
    }
  }, [user]);

  return (
    <DefaultLayout>
      <AuthGate loggedOutRedirect="/login" onUser={setUser} />

      {loading && <LoadingIndicator />}

      <div className="mt-8">
        <div>
          <>
            <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Personal Information
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Your name will be public, but your email stays with us.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <form action="#" method="POST">
                    <div className="overflow-hidden shadow sm:rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="firstName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              First name
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              id="firstName"
                              autoComplete="given-name"
                              value={profile.firstName}
                              onChange={handleChange}
                              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="lastName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Last name
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              autoComplete="family-name"
                              value={profile.lastName}
                              onChange={handleChange}
                              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="email-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email address
                            </label>
                            <input
                              readOnly={true}
                              disabled={true}
                              type="text"
                              name="email-address"
                              id="email-address"
                              autoComplete="email"
                              value={user?.email}
                              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm opacity-50 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                        <button
                          onClick={onSubmit}
                          type="submit"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>

            <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Background Rental Settings
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Configure options around setting your virtual background.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <form action="#" method="POST">
                    <div className="overflow-hidden shadow sm:rounded-md">
                      <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="reservationLength"
                              className="block text-sm font-medium text-gray-700"
                            >
                              How long do background reservations last?
                            </label>
                            <div className="flex flex-row items-center">
                              <input
                                type="number"
                                max={1440}
                                min={1}
                                step={1}
                                name="reservationLength"
                                id="reservationLength"
                                value={profile.reservationLength}
                                onChange={handleChange}
                                className="block w-16 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                              <span className="ml-2 text-sm font-medium text-gray-700">
                                seconds
                              </span>
                            </div>
                          </div>

                          <div className="col-span-6 sm:col-span-4">
                            <label
                              htmlFor="reservationLength"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Who can set your background?
                            </label>
                            <fieldset className="mt-4">
                              <legend className="sr-only">
                                Notification method
                              </legend>
                              <div className="space-y-4">
                                <div
                                  key="openDomain"
                                  className="flex items-center"
                                >
                                  <input
                                    id="openDomain"
                                    name="domainPrivacy"
                                    onChange={(e) =>
                                      handleChange({
                                        target: {
                                          id: "domainPrivacy",
                                          value: "open",
                                        },
                                      })
                                    }
                                    type="radio"
                                    defaultChecked={
                                      profile.domainPrivacy == "openDomain"
                                    }
                                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor="openDomain"
                                    className="block ml-3 text-sm font-medium text-gray-700"
                                  >
                                    Open to anyone
                                  </label>
                                </div>
                                <div
                                  key="closedDomain"
                                  className="flex items-center"
                                >
                                  <input
                                    id="closedDomain"
                                    name="domainPrivacy"
                                    type="radio"
                                    onChange={(e) =>
                                      handleChange({
                                        target: {
                                          id: "domainPrivacy",
                                          value: "closed",
                                        },
                                      })
                                    }
                                    defaultChecked={
                                      profile.domainPrivacy == "closedDomain"
                                    }
                                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor="closedDomain"
                                    className="block ml-3 text-sm font-medium text-gray-700"
                                  >
                                    Only revlocal domains
                                  </label>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                        <button
                          onClick={onSubmit}
                          type="submit"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </DefaultLayout>
  );
}
