import React from 'react';

// Required class component demonstration for CIE 2.
export default class Stats extends React.Component {
  render() {
    const { books } = this.props;

    const total = books.length;

    const completed = books.filter(
      book => book.status === 'Completed'
    ).length;

    const reading = books.filter(
      book => book.status === 'Reading'
    ).length;

    const wantToRead = books.filter(
      book => book.status === 'Want to Read'
    ).length;

    const averageProgress = total
      ? Math.round(
          books.reduce(
            (sum, book) => sum + Number(book.progress || 0),
            0
          ) / total
        )
      : 0;

    const completedPercentage = total
      ? Math.round((completed / total) * 100)
      : 0;

    const readingPercentage = total
      ? Math.round((reading / total) * 100)
      : 0;

    const wantToReadPercentage = total
      ? Math.round((wantToRead / total) * 100)
      : 0;

    return (
      <section className="analytics-section">
        <div className="section-heading analytics-heading">
          <div>
            <p className="eyebrow">READING ANALYTICS</p>
            <h2>Your reading overview</h2>
          </div>
          <span className="analytics-progress">
            {averageProgress}% overall progress
          </span>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Total books</span>
            <strong>{total}</strong>
          </div>

          <div className="stat-card">
            <span>Want to Read</span>
            <strong>{wantToRead}</strong>
          </div>

          <div className="stat-card">
            <span>Currently reading</span>
            <strong>{reading}</strong>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <strong>{completed}</strong>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <p className="eyebrow">LIBRARY BREAKDOWN</p>
              <h3>Reading status</h3>
            </div>

            <strong>{averageProgress}%</strong>
          </div>

          <div className="overall-progress">
            <span style={{ width: `${averageProgress}%` }} />
          </div>

          <div className="status-breakdown">
            <div className="status-row">
              <div className="status-info">
                <span>Want to Read</span>
                <strong>{wantToReadPercentage}%</strong>
              </div>

              <div className="status-progress">
                <span style={{ width: `${wantToReadPercentage}%` }} />
              </div>
            </div>

            <div className="status-row">
              <div className="status-info">
                <span>Reading</span>
                <strong>{readingPercentage}%</strong>
              </div>

              <div className="status-progress">
                <span style={{ width: `${readingPercentage}%` }} />
              </div>
            </div>

            <div className="status-row">
              <div className="status-info">
                <span>Completed</span>
                <strong>{completedPercentage}%</strong>
              </div>

              <div className="status-progress">
                <span style={{ width: `${completedPercentage}%` }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}