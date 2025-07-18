import ReactDOM from "react-dom/client";

import "./index.css";
import React, {useEffect, useMemo, useState} from "react";
import {ThemeProvider, useTheme} from "./ThemeProvider";

const ThemeToggler = () => {
	const {theme, toggleTheme} = useTheme();
	return <button onClick={() => toggleTheme(theme === "light" ? "dark" : "light")}>Switch to {theme === "light" ? "Dark" : "Light"} Mode</button>;
};

const ThemeMaster = () => {
	const {theme} = useTheme();
	return (
		<>
			<h1>Current Theme: {theme.toLocaleUpperCase()}</h1>
			<ThemeToggler />
		</>
	);
};

const App = () => {
	const [value, setValue] = useState(0);
	const [taskInput, setTaskInput] = useState("");
	const [tasks, setTasks] = useState([]);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	const computeFactorial = (n: number): number => {
		if (n <= 1) return 1;
		return n * computeFactorial(n - 1);
	};
	const factorial = useMemo(() => computeFactorial(value), [value]);
	const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTaskInput(e.target.value);
	};
	const handleAddTask = () => {
		if (taskInput.trim() !== "") {
			setTasks([...tasks, {name: taskInput, completed: false}]);
			setTaskInput("");
		}
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const data = await fetch("https://jsonplaceholder.typicode.com/users").catch(console.log);
			setUsers(await data?.json());
			setLoading(false);
		};
		fetchUsers();
	}, []);

	return (
		<ThemeProvider>
			<div className={`container`}>
				<section>
					<h1>5</h1>
					<h2>
						Factorial of {value} is {factorial}
					</h2>
				</section>
				<section>
					<h1>4</h1>
					<ThemeMaster />
				</section>
				<section>
					<h1>3</h1>
					{loading && <p>Loading users...</p>}
					{!loading && users.length > 0 && (
						<>
							<p>Users loaded successfully!</p>
							<p>Total Users: {users.length}</p>
							<h2>Users:</h2>
							{users.length > 0 &&
								users.map(user => (
									<>
										{`${user["name"]} ${user["email"]}`}
										<br />
									</>
								))}
						</>
					)}
				</section>
				<section>
					<h1>2</h1>
					<h3>Add Task:</h3>
					<input name='task-input' value={taskInput} placeholder='Enter Task' onChange={handleTaskInputChange} />
					<button className='btn-add' onClick={handleAddTask}>
						Add
					</button>
					<h3>Tasks:</h3>
					<ol>
						{tasks.length > 0 &&
							tasks.map((task, index) => (
								<li key={index}>
									<h4>{task["name"]}</h4>
									<button
										className='btn-complete'
										onClick={() => {
											const updatedTasks = [...tasks];
											updatedTasks[index]["completed"] = !updatedTasks[index]["completed"];
											setTasks(updatedTasks);
										}}>
										{task["completed"] ? "Undo" : "Complete"}
									</button>
									<span className={task["completed"] ? "completed" : ""}>{task["completed"] ? "Completed" : "Not Completed"}</span>
									&nbsp;
									<button className='btn-delete' onClick={() => setTasks(tasks.filter((_, i) => i !== index))}>
										Delete
									</button>
								</li>
							))}
					</ol>
				</section>
				<section>
					<h1>1</h1>
					<h2>Counter: {value}</h2>
					<button className='btn-counter' onClick={() => setValue(value - 1)}>
						Decrement
					</button>
					<button className='btn-counter' onClick={() => setValue(value + 1)}>
						Increment
					</button>
					<button className='btn-counter' onClick={() => setValue(0)}>
						Reset
					</button>
				</section>
			</div>
		</ThemeProvider>
	);
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
