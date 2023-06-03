const style = {
  container: `bg-slate-100 rounded-md shadow-xl p-4 mr-8 mt-8`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-[#2EB62C] text-slate-100`,
  count: `text-center p-2`,
};

const MainBreakfastsView = () => {
  return (
   
    
        <div className={style.container}>
          <h3 className={style.heading}>Weekly Breakfasts</h3>
        </div>
    
   
  );
};

export default MainBreakfastsView;
