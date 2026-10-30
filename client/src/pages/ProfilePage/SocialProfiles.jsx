const SocialProfiles = () => {
    return (
      <div className="my-8">
        <h4 className="text-lg sm:text-xl font-semibold">Link Social Profiles</h4>
        <br className="mt-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center justify-between  border-2 rounded-sm px-6 py-4 cursor-pointer">
            <img
              className="w-7 rounded-full"
              src="https://i.ibb.co/1f2vcTX/facebook.png"
              alt=""
            />
            <h6 className="text-sm">Facebook</h6>
            <p className="text-xs cursor-pointer">connect</p>
          </div>
          <div className="flex items-center justify-between  border-2 rounded-sm px-6 py-4 cursor-pointer">
            <img
              className="w-7 rounded-full"
              src="https://i.ibb.co/NswGbSs/twitter.png"
              alt=""
            />
            <h6 className="text-sm">Facebook</h6>
            <p className="text-xs cursor-pointer">connect</p>
          </div>
          <div className="flex items-center justify-between border-2 rounded-sm px-6 py-4 cursor-pointer">
            <img
              className="w-7 rounded-full"
              src="https://i.ibb.co/fp40mLy/linkedin.png"
              alt=""
            />
            <h6 className="text-sm">Facebook</h6>
            <p className="text-xs cursor-pointer">connect</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default SocialProfiles;
  