export const Banner = () => {
  return (
    <div className='p-4 d-flex bd-highlight'>
      <div className='d-flex flex-column w-25'>
        <h3>Features</h3>
        <ul>
          <li className='w-75'>Get Stats for all NHL players</li>
          <li className='w-75'>
            Sort by multiple columns at once (sort order)
          </li>
          <li className='w-75'>Apply Filters based on stat columns and Team</li>
          <li className='w-75'>
            Carry out these operations based on stat averages
          </li>
          <li className='w-75'>
            Connect to Yahoo! Fantasy API to which players are availble in your
            Fantasy Hockey Leage
          </li>
        </ul>
      </div>
      <div className='d-flex flex-column'>
        <h3>Tech Stack</h3>
        <h5 className='ms-4'>Front-End:</h5>
        <ul className='ms-4'>
          <li>React (create-react-app)</li>
          <li>TypeScript </li>
          <li>BootStrap 5.0 </li>
          <li>Redux state management</li>
        </ul>
        <h5 className='ms-4'>Back-End:</h5>
        <ul className='ms-4'>
          <li>Node.js / Expressjs (REST Endpoints)</li>
          <li>Firebase Functions (Endpoint hosting) </li>
          <li>JavaScript</li>
          <li>RotoWire API</li>
          <li>Yahoo! OAuth 2.0 user authentication </li>
          <li>Yahoo! Fantasy API</li>
          <li>
            Oath Access-Token and Session-Code peristed in Firebase Realtime
            Database
          </li>
        </ul>
      </div>
      <div className='d-flex flex-column'>
        <h3>Noah Merenbloom</h3>
        <h5 className=''>nmerenbloom@gmail.com</h5>
        <h5 className=''>
          <a
            target='_blank'
            href='https://github.com/nmerenbloom/nhl-stats-app'
          >
            github.com/nmerenbloom/nhl-stats-app
          </a>
        </h5>
        <p>Last Deploy: 12/27/2023</p>
        <b>Click GO to fetch data</b>
      </div>
    </div>
  );
};
