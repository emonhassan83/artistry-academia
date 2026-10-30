const InstructorClassCard = ({ course }) => {
  const { classImage, className, courseFree, seats, duration, time, level } =
    course;

  return (
    <div className="card lg:card-side bg-base-100 shadow-lg rounded-lg">
      <figure className="lg:w-[60%]">
        <img src={classImage} alt="Instructor Class" />
      </figure>
      <div className="card-body">
        <h2 className="text-sm sm:text-base font-semibold">{className}</h2>
        <div className="space-y-1 mt-2">
          <p className="text-xs sm:text-sm">Available seats: {seats}</p>
          <p className="text-xs sm:text-sm">Course Free: ${courseFree}</p>
          <p className="text-xs sm:text-sm">
            Duration: {duration} ({time})
          </p>
          <p className="text-xs sm:text-sm">Level: {level}</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorClassCard;
