import React from "react";

interface ProfileComponent {
  name: string;
  position: string;
  short_bio: string;
  pfp_link: string;
  prof_id: number;
}

const profileData: ProfileComponent[] = [
  {
    name: "sample name",
    position: "sample position",
    short_bio: "i have worked in xyz...",
    pfp_link: "/hamters/funnyhamster1.jpeg",
    prof_id: 1,
  },
  {
    name: "sample name",
    position: "sample position",
    short_bio: "i have worked in xyz...",
    pfp_link: "/hamters/funnyhamster2.jpg",
    prof_id: 2,
  },
  {
    name: "sample name",
    position: "sample position",
    short_bio: "i have worked in xyz...",
    pfp_link: "/hamters/funnyhamster3.jpg",
    prof_id: 3,
  },
];

const PplList: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {profileData.map((profile) => (
        <div
          key={profile.prof_id}
          className="flex items-center gap-8 p-4 rounded-xl bg-white/50"
        >
          <div>
            <img
              src={profile.pfp_link}
              alt={profile.name}
              className="w-25 h-25 rounded-full object-cover  border-2 border-scottycon-pink"
            />
          </div>
          <div className="flex-col">
            <p className="text-2xl font-bold">{profile.name}</p>
            <hr></hr>
            <p className="font-medium italic">{profile.position}</p>
            <p>{profile.short_bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PplList;
