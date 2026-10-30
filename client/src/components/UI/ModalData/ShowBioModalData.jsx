import { useGetAUser } from "../../../hooks/useFetchUsers";
import { useInstructorById } from "../../../hooks/useInstructor";
import Loader from "../../Loader/Loader";

const ShowBioModalData = ({ instructorId }) => {
  const [instructorBio, isInstructorBioLoading] = useInstructorById({
    id: instructorId,
  });
  const [user] = useGetAUser({ id: instructorId });

  if (isInstructorBioLoading) {
    return <Loader />;
  }

  return (
    <div>
      {!isInstructorBioLoading && user && instructorBio && (
        <>
          <h4 className="text-xl font-semibold mb-4">{user?.data?.name}</h4>
          <div className="space-y-1 text-sm">
            <p className="text-sm">{instructorBio?.data?.education}</p>
            <p>{instructorBio?.data?.specialization}</p>
            <p>{instructorBio?.data?.biography}</p>
            <p>{instructorBio?.data?.achievements}</p>
            <p>{instructorBio?.data?.experience}</p>
            <p>{instructorBio?.data?.teachingPhilosophy}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowBioModalData;
