# SlimMom

SlimMom is a modern nutrition and calorie tracking app designed to help users achieve their health goals with personalized daily calorie limits and smart food recommendations.

## Key Features

### Personalized Calorie Calculation
- Instantly calculates your daily calorie limit based on your Height, Weight, Target Weight, Age, Gender, and Blood Type.
- Provides a list of foods to avoid, tailored to your blood type, for optimal nutrition.

### Two Modes: Guest & Registered User

#### Guest Users
- Instantly receive your daily calorie limit and food recommendations without registration.
- No data is stored—calculations are performed in real time and not saved.

#### Registered Users
- Save your personal calorie limit and track your daily progress.
- Access a comprehensive dashboard with detailed daily summaries.

### Intuitive Dashboard Layout

#### Right Panel: Daily Summary & Recommendations
- **Remaining Calories:** See how many calories you have left for the day.
- **Gained Calories:** Track the total calories consumed.
- **Daily Calorie Limit:** Your personalized daily target.
- **Daily Gained Calorie Percentage:** Visualize your progress towards your daily goal.
- **Foods to Avoid:** Instantly see a list of foods not recommended for your blood type.

#### Left Panel: Daily Food Diary
- **Date Picker:** Easily select any date to view or edit your food diary.
- **Quick Add Form:** 
	- Select foods from a searchable database.
	- Enter the amount (in grams) and add it to your daily list with one click.
- **Food List:** 
	- View all foods consumed for the selected day, including:
		- Product Name
		- Consumed Amount (grams)
		- Gained Calories (calculated automatically)
- **Dynamic Updates:** 
	- All statistics and summaries update instantly as you add or remove foods.
	- Switching dates updates both the food list and the summary panel, allowing you to track your nutrition history day by day.

### Seamless Experience
- Clean, responsive interface for both desktop and mobile.
- Real-time updates and smooth navigation for an enjoyable user experience.

---

SlimMom empowers you to take control of your nutrition with science-backed calculations and easy-to-use tracking tools. Start your journey to a healthier you today!
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
