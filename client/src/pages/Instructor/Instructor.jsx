/* eslint-disable no-unused-vars */
import InstructorCard from "../../components/Card/InstructorCard";
import Container from "../../components/Container/Container";
import { Helmet } from "react-helmet-async";
import CardSkeleton from "../../components/Card/CardSkeleton";
import { usePopularInstructors } from "../../hooks/useInstructor";

const Instructor = () => {
  const [instructors, isLoading] = usePopularInstructors();
  
  return (
    <Container>
      <Helmet>
        <title>Artistry Academia | Instructor</title>
      </Helmet>
      <div className="mt-16 mb-10">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoading &&
          Array.from(new Array(8)).map((item, index) => (
            <CardSkeleton key={index} height={300} />
          ))}
        {!isLoading && instructors &&
          instructors?.data?.map((instructor) => (
            <InstructorCard key={instructor._id} instructor={instructor} />
          ))}
      </div>
      </div>
    </Container>
  );
};

export default Instructor;
