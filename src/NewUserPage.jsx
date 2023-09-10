import code from "./assets/code.png";
import homeView from "./assets/home-view.png";
import goals from "./assets/goals.jpg";

const style = {
  outerContainer: `rounded-lg shadow-lg flex flex-col w-full bg-white outline-none mt-5 p-5`,
  heading: `text-3xl font-bold text-center text-[#116A7B] p-2 my-4 w-full`,
  subhead: `text-2xl font-bold text-[#116A7B] ml-1`,
  subheadTryIt: `text-2xl font-bold text-[#116A7B] ml-1 text-center`,
  text: `text-med text-left text-gray-800 p-2 w-full`,
  centeredText: `text-med text-center text-gray-800 p-2 w-full`,
  button: `bg-[#116A7B] text-white m-3 py-3 px-6 rounded shadow font-bold uppercase text-sm`,
  imageContainer: `w-1/2`,
  mainContainer: `flex flex-col`,
  sectionContainer: `w-full bg-slate-100 rounded-lg p-3 my-5 flex lg:flex-row lg:items-top md:flex-col md:items-center sm:flex-col sm:items-center h-full  justify-center`,
  plainJaneSectionContainer: `w-full bg-slate-100 rounded-lg p-3 my-5 flex flex-col`,
  textContainer: `lg:px-5 md:px-3 md:py-3`,
  listStyle: `text-med text-left text-gray-800 list-disc ml-10 mt-3`,
  textDone: `text-med text-left text-gray-800 line-through`,
};

function NewUserPage() {
  return (
    <div className={style.outerContainer}>
      <h1 className={style.heading}>Welcome to Shana&apos;s Meal Planner</h1>
      <div className={style.mainContainer}>
        <div className={style.sectionContainer}>
          <div className={style.imageContainer}>
            <img src={homeView} alt="code" />
          </div>
          <div className={style.textContainer}>
            <h2 className={style.subhead}>
              What are the goals of this project?
            </h2>
            <p className={style.text}>
              I created this meal planner based on the way that I like to plan
              my dinners and organize my recipes. My goals were to:
            </p>
            <ul className={style.listStyle}>
              <li>Keep a database of recipes that I use often</li>

              <li>
                Keep a list of 4-7 dinners that I want to cook for the current
                week
              </li>
              <li>
                Have an easy way to add or remove recipes from the weekly dinner
                list
              </li>

              <li>
                Have a single recipe view that is clean and easy to view on a
                mobile screen, marking off completed steps
              </li>

              <li>
                Keep a grocery list where items can be manually added or added
                directly from the recipe view
              </li>

              <li>
                Add user authentication so multiple users can use the same web
                app and database
              </li>
            </ul>
          </div>
        </div>
        <div className={style.plainJaneSectionContainer}>
          <div>
            <h2 className={style.subheadTryIt}>Try it out yourself</h2>
            <p className={style.centeredText}>
              Create your own account or log in with these test credentials:{" "}
              <br />
              username: testuser@test.com password: 123456
            </p>
          </div>
        </div>
        <div className={style.sectionContainer}>
          <div className={style.textContainer}>
            <h2 className={style.subhead}>Nerd stuff</h2>
            <p className={style.text}>
              I also created this meal planner to practice my software
              development skills in React. This project uses:
            </p>
            <ul className={style.listStyle}>
              <li>ReactJS</li>
              <li>Firestore Database</li>
              <li>Firebase Authentication</li>
              <li>Tailwind CSS</li>
              <li>Vite</li>
              <li>Hosted with Firebase</li>
            </ul>
            <p className={style.text}>
              You can view the Github repo here:
              <br />
              <a href="https://github.com/shanarussell/meal-planner">
                github.com/shanarussell/meal-planner
              </a>
            </p>
          </div>
          <div className={style.imageContainer}>
            <img src={code} alt="code" />
          </div>
        </div>
        <div className={style.sectionContainer}>
          <div className={style.imageContainer}>
            <img src={goals} alt="code" />
          </div>
          <div className={style.textContainer}>
            <h2 className={style.subhead}>
              Future goals and features for this web app
            </h2>
            <ul className={style.listStyle}>
              <li>Ability to search recipes</li>
              <li>Ability to tag recipes</li>
              <li>
                Improve the image upload button behavior when adding or editing
                a recipe
              </li>
              <li>
                Add ability to delete file from upload if the wrong one is
                chosen
              </li>
              <li>
                Add a close button at the bottom of modals that currently have
                one on the top
              </li>
              <li>Add a print button, maybe</li>
              <li>Add pagination to the recipe view</li>
              <li className={style.textDone}>
                Remove need to refresh page to see changes to weely dinners
              </li>
              <li className={style.textDone}>
                Password Reset
              </li>
              <li>
                Add ability to just hit return when logging in instead of
                pushing the login button
              </li>
              <li>
                Automatically redirect to home page after logging in or
                registering
              </li>
              <li>
                Add a button to the single recipe view that allows you to also
                remove from weekly dinners
              </li>
              <li>
                Adding to the grocery list or to weekly dinners from the single
                recipe view - it needs to be more obvious that the item has been
                added
              </li>
              <li>Navbar, login and register pages should be cuter</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUserPage;
