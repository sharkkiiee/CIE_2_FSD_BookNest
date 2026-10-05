import React from 'react';

// Required class component demonstration for CIE 2.
export default class Stats extends React.Component {
  render() {
    const { books } = this.props;
    const completed = books.filter(book => book.status === 'Completed').length;
    const reading = books.filter(book => book.status === 'Reading').length;
    const average = books.length ? Math.round(books.reduce((sum, book) => sum + Number(book.progress), 0) / books.length) : 0;

    return (
      <section className="stats-grid">
        <div className="stat-card"><span>Total books</span><strong>{books.length}</strong></div>
        <div className="stat-card"><span>Completed</span><strong>{completed}</strong></div>
        <div className="stat-card"><span>Currently reading</span><strong>{reading}</strong></div>
        <div className="stat-card"><span>Average progress</span><strong>{average}%</strong></div>
      </section>
    );
  }
}
