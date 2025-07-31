import React, { useState, useEffect } from 'react';
import List from './List';

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="text-center d-flex flex-column align-items-center">
            

			<h1 className="text-center mt-5 display-1">todos</h1>
			<List/>
			
		</div>
	);
};

export default Home;