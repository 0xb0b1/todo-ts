import React from "react";
import { Tasks } from "../../components/tasks";

export default function Home() {
  return (
    <div className="max-w-[1120px] m-auto my-4 px-4 py-12 bg-gray-800 rounded-xl">
      <Tasks />
    </div>
  );
}
