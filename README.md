# Data Journalism/D3 Challenge

### Background

The challenge is to analyze a data set that includes by state median income, age, percentages of population living in poverty, lacking access to healthcare, with obesity, and who smoke.

The files for the challenge are stored within a directory called D3_data_journalism. 

### Core Challenge: D3 Dabbler (Required)
A scatter plot is created for `Healthcare vs. Poverty` - this part of the challenge works by opening index_r.html in a live server (or by using `python -m http.server` to run the visualization, for hosting the page at `localhost:8000` in the web browser. The scatter plot uses circles, and the state abbreviations are included as the labels. The data for the challenge is stored in data.csv in the assets/data folder.

### Bonus: Interactivity for Plotting of Other Factors (Optional Assignment Completed)
This bonus challenge, viewed using index.html, includes options for both the x-axis and y-axis that allow a user to choose what type of data will be displayed in the scatter plot. By clicking on different options along the x-axis, the circles move to the correct locations. Also when clicking on a different choice along the y-axis, the cirlces will move to display the chosen data. Transitions for the circles' locations are included, and also the d3.tip plugin is used to display tooltip data on hovering for each circle. Three options to be analyzed are provided for each axis.
