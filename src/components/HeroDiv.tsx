import { useState, ChangeEvent } from "react";
import usersArray, { User, users } from "../constants/users";

const HeroDiv = () => {
  const [input, setinput] = useState("");
  const [users, setUsers] = useState<users>([]);
  const [clickedUser, setclickedUser] = useState<users>([]);

  const handleUserClicked = (user: User) => {
    setclickedUser((prev) => [...prev, user]);
    const updatedDropdown = users.filter(
      (dropdownUser) => dropdownUser.id !== user.id
    );
    setUsers(updatedDropdown.slice(0, 10));
    setinput("");
  };

  const handleDeleteUser = (user: User) => {
    const deletedUser = clickedUser.filter((User) => User.id === user.id);
    setinput("");
    setclickedUser(clickedUser.filter((User) => User.id !== user.id));
    setUsers(deletedUser.slice(0, 10));
  };

  const filterData = (data: string) => {
    if (data === "") {
      return;
    }
    const userFilter = usersArray.filter((user) => {
      return user.name.toLowerCase().includes(data.toLowerCase());
    });
    const filteredUsers = userFilter.filter(
      (user) => !clickedUser.some((clicked) => clicked.id === user.id)
    );
    setUsers(filteredUsers.slice(0, 10));
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (input === "") {
      if (e.key === "Backspace") {
        const lastUser = clickedUser.pop();

        setclickedUser((prev) => [...prev]);
        if (lastUser != undefined) {
          setinput(lastUser.name);
        }
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setinput(data);
    filterData(data);
  };

  return (
    <div className="bg-slate-100  h-[60vh] md:w-[50vw]">
      <div className="border border-b-blue-400 flex flex-wrap">
        {clickedUser.length > 0 &&
          clickedUser.map((user) => {
            return (
              <div
                key={user.id}
                style={{ minWidth: "100px" }}
                className="bg-gray-300 rounded-lg my-2 flex items-center mx-2"
              >
                <img
                  src={user.profilePhoto}
                  className="h-6 w-6 "
                  alt={`Profile Pic of ${user.name} `}
                />
                <p className="mx-1">{user.name}</p>
                <img
                  onClick={() => handleDeleteUser(user)}
                  src="/cross.svg"
                  className="h-5 w-5 cursor-pointer hover:bg-gray-200 border rounded-lg mx-1"
                />
              </div>
            );
          })}
        <div>
          <input
            type="text"
            value={input}
            placeholder="Search for an User"
            onKeyDown={handleBackspace}
            onChange={(e) => handleChange(e)}
            className="w-40 md:w-full bg-transparent focus:outline mx-2 my-2 relative"
          />
          {input != "" && (
            <div className="w-36 h-56  overflow-y-scroll overflow-x-hidden md:w-fit  bg-white mb-2 mx-2 absolute">
              {users.map((user) => {
                return (
                  <div
                    className="hover:bg-slate-300 py-2 my-4 md:flex flex-wrap"
                    onClick={() => handleUserClicked(user)}
                    key={user.id}
                  >
                    <img
                      src={user.profilePhoto}
                      className="h-6 w-6 "
                      alt={`Profile Pic of ${user.name} `}
                    />
                    <p className="text-base md:mx-4">{user.name}</p>
                    <p className="text-xs md:text-xs text-gray-400 items-center my-auto">
                      {user.email}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroDiv;
