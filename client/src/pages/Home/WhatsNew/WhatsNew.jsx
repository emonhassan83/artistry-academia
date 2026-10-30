import Container from "../../../components/Container/Container";

const whatsNewData = [
    {
      title: "Mixed Media",
      subtitle:
        "Explore Toronto School of Art's Mixed Media courses! Collage, assemblage, image transfers, and book arts and more!",
      image: "https://imagizer.imageshack.com/img922/8894/rTf9O1.png",
    },
    {
      title: "Printmaking",
      subtitle: "Learn print techniques of making artist multiples.",
      image: "https://imagizer.imageshack.com/img922/673/gxpIKV.png",
    },
    {
      title: "Digital Arts",
      subtitle:
        "Explore photography, digital sculpting, video editing, animation, digital painting and Adobe Creative Suite.",
      image: "https://imagizer.imageshack.com/img924/8905/4U9bAw.png",
    },
    {
      title: "Ceramic Arts",
      subtitle:
        "Ceramics and Pottery Courses at Toronto School of Art! Learn how to throw on the potter's wheel, hand-build, and sculpt.",
      image: "https://imagizer.imageshack.com/img924/3914/gnqUCx.png",
    },
    {
      title: "Professional Development",
      subtitle:
        "Which pathways lead to becoming a professional artist? Explore possibilities with our Professional  Development courses.",
      image: "https://imagizer.imageshack.com/img922/1936/4BWw6u.png",
    },
    {
      title: "Fibre Arts",
      subtitle:
        "Unravel techniques in fibre arts through surface design, weaving and experimental embroidery.",
      image: "https://imagizer.imageshack.com/img924/1439/J3IsRj.png",
    },
  ];
  
  const WhatsNew = () => {
    return (
      <Container>
        <h2 className="primary-font font-semibold text-[22px] sm:text-3xl md:text-4xl lg:text-5xl uppercase mt-14 md:mt-20 lg:mt-32 sm:text-center">
          Whats New
        </h2>
        <p className="sm:mt-3 text-xs sm:text-sm md:text-base lg:text-lg sm:text-center mb-6 sm:mb-10">
          Explore our new classes and discover the World through Art
        </p>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {whatsNewData.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-[1500ms] hover:scale-105 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75 z-10"></div>
              <div className="absolute inset-0 z-20 flex flex-col justify-center p-4 text-white">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm mt-2">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  };
  
  export default WhatsNew;
  