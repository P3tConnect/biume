import React from "react";

type Team = {
  avatar: string;
  name: string;
  dateAjout: string;
  roles: string[];
};

const TeamList = () => {
  const teamMembers: Team[] = [
    {
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Lucas Martin",
      dateAjout: "01/10/23",
      roles: ["Employé", "Designer"],
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      name: "Elise Dubois",
      dateAjout: "05/09/23",
      roles: ["Employé"],
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/47.jpg",
      name: "Thomas Bernard",
      dateAjout: "12/08/23",
      roles: ["Educateur Canin", "Manager"],
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      name: "Sophie Lefevre",
      dateAjout: "15/07/23",
      roles: ["Product Owner", "UI/UX Designer"],
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/25.jpg",
      name: "Antoine Dupont",
      dateAjout: "30/09/23",
      roles: ["Analyste", "Employé"],
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Lucas Martin",
      dateAjout: "01/10/23",
      roles: ["Employé", "Designer"],
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      name: "Elise Dubois",
      dateAjout: "05/09/23",
      roles: ["Employé"],
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/47.jpg",
      name: "Thomas Bernard",
      dateAjout: "12/08/23",
      roles: ["Educateur Canin", "Manager"],
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      name: "Sophie Lefevre",
      dateAjout: "15/07/23",
      roles: ["Product Owner", "UI/UX Designer"],
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/25.jpg",
      name: "Antoine Dupont",
      dateAjout: "30/09/23",
      roles: ["Analyste", "Employé"],
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Lucas Martin",
      dateAjout: "01/10/23",
      roles: ["Employé", "Designer"],
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      name: "Elise Dubois",
      dateAjout: "05/09/23",
      roles: ["Employé"],
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/47.jpg",
      name: "Thomas Bernard",
      dateAjout: "12/08/23",
      roles: ["Educateur Canin", "Manager"],
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      name: "Sophie Lefevre",
      dateAjout: "15/07/23",
      roles: ["Product Owner", "UI/UX Designer"],
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/25.jpg",
      name: "Antoine Dupont",
      dateAjout: "30/09/23",
      roles: ["Analyste", "Employé"],
    },
  ];

  return (
    <div className="p-4">
      <table className="min-w-full table-auto bg-white rounded-lg dark:bg-background">
        <thead>
          <tr className="">
            <th className="px-4 py-2 text-left">Nom</th>
            <th className="px-4 py-2 text-left">Date d'ajout</th>
            <th className="px-4 py-2 text-left">Rôle(s)</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2 flex items-center">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <span>{member.name}</span>
              </td>
              <td className="px-4 py-2">{member.dateAjout}</td>
              <td className="px-4 py-2">
                {member.roles.map((role, i) => (
                  <span
                    key={i}
                    className="inline-block bg-secondary/20 text-white px-3 py-1 rounded-full text-xs font-bold mr-2"
                  >
                    {role}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamList;
