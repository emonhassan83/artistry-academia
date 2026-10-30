/* eslint-disable no-unused-vars */
const ShowCredentialsModalData = ({ setOpen }) => {
  const demoCredentials = [
    {
      role: "Admin",
      email: "emilysmith@example.com",
      password: "!Aa123",
    },
    {
      role: "Instructor",
      email: "michaeljohnson@example.com",
      password: "!Aa123",
    },
    {
      role: "Student",
      email: "jackjohnson@example.com",
      password: "!Aa123",
    },
  ];

  return (
    <>
      {demoCredentials && (
        <>
          <p className="text-sm mb-3 text-yellow-600">
            <strong>Warning:</strong> These are demo credentials intended for
            demonstration purposes only. Please do not use them for actual
            authentication.
          </p>
          <div className="space-y-4">
            {demoCredentials.map((credential, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <h5 className="text-lg font-semibold">{credential.role}</h5>
                <p className="text-sm mt-2">
                  <strong>Email:</strong> {credential.email}
                </p>
                <p className="text-sm">
                  <strong>Password:</strong> {credential.password}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ShowCredentialsModalData;
