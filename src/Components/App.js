import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const url = "https://m2ctech.github.io/jsonapi/staff.json";

//css
import classes from "./App.module.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className={classes.loading}>
        <h1>Loading.....</h1>
      </div>
    );
  }

  const { dates, duties, title, company } = jobs[value];
  return (
    <section className={classes.section}>
      <div className={classes.title}>
        <h2>experience</h2>
        <div className={classes.underline}></div>
      </div>
      <div className={classes.jobs}>
        {/*btn-container */}
        <div className={classes.buttons}>
          {jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)}
                className={`${classes.jobbtn} ${
                  index === value && classes.activebtn
                }`}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        {/* */}
        <article className={classes.jobinfo}>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className={classes.jobdate}>{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className={classes.jobdesc}>
                <FaAngleDoubleRight className={classes.jobicon} />
                <p>{duty}</p>
              </div>
            );
          })}
          <div className={classes.moreinfo}>
            <button>MORE INFO</button>
          </div>
        </article>
      </div>
    </section>
  );
}
