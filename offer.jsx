import React, { useEffect, useRef, useState, useMemo } from 'react';

export default function OfferPage() {
  const [who, setWho] = useState(null);
  const [disabledIds, setDisabledIds] = useState(new Set());
  const [query, setQuery] = useState(''); // search by name [web:21][web:23]
  const [status, setStatus] = useState('All'); // All | Approved | Rejected [web:21][web:35]
  const [sortDir, setSortDir] = useState('oldest'); // oldest | newest [web:26][web:30]

  const modalRef = useRef(null);
  const bsModal = useRef(null);

  useEffect(() => {
    if (modalRef.current && !bsModal.current) {
      bsModal.current = new window.bootstrap.Modal(modalRef.current, {
        backdrop: 'static',
        keyboard: true,
      });
    }
  }, []);

  const data = [
    {
      id: 'APP002',
      name: 'Ram',
      date: 'Nov 24, 2025',
      doc: 'Approved',
      score: 820,
      limit: 7500,
      action: 'Approved',
    },
    {
      id: 'APP001',
      name: 'Raj',
      date: 'Oct 1, 2025',
      doc: 'Approved',
      score: 780,
      limit: 5000,
      action: 'Approved',
    },
    {
      id: 'APP003',
      name: 'Rajesh',
      date: 'Sep 15, 2025',
      doc: 'Approved',
      score: 690,
      limit: 3000,
      action: 'Approved',
    },
    {
      id: 'APP005',
      name: 'Vimal',
      date: 'Jul 11, 2025',
      doc: 'Approved',
      score: 480,
      limit: 6400,
      action: 'Rejected',
    },
    {
      id: 'APP004',
      name: 'Surya',
      date: 'Jun 12, 2025',
      doc: 'Approved',
      score: 800,
      limit: 9000,
      action: 'Rejected',
    },
  ];

  // Robust date parser to epoch time for sort reliability [web:39][web:30]
  const toTime = (d) => new Date(d).getTime();

  // Combine search, status filter, and sort in one memoized derivation [web:21][web:26]
  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = data.filter((r) => {
      const matchesSearch = q === '' || r.name.toLowerCase().includes(q); // case-insensitive [web:23][web:32]
      const matchesStatus = status === 'All' || r.action === status; // action considered as status [web:21][web:35]
      return matchesSearch && matchesStatus;
    });

    rows = rows.sort((a, b) => {
      const ta = toTime(a.date);
      const tb = toTime(b.date);
      return sortDir === 'oldest' ? ta - tb : tb - ta; // numeric comparison [web:39][web:30]
    });

    return rows;
  }, [data, query, status, sortDir]);

  const handleActionClick = (row) => {
    if (disabledIds.has(row.id)) return;
    setWho(row);
    setDisabledIds((prev) => new Set(prev).add(row.id));
    if (row.action === 'Approved') {
      bsModal.current?.show();
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-3">Offer Confirmation</h4>

      <div className="mb-3 d-flex gap-2 flex-wrap">
        <input
          className="form-control"
          style={{ maxWidth: 260 }}
          placeholder="search by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="form-select"
          style={{ maxWidth: 180 }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
        <select
          className="form-select"
          style={{ maxWidth: 200 }}
          value={sortDir}
          onChange={(e) => setSortDir(e.target.value)}
        >
          <option value="oldest">Date(Oldest First)</option>
          <option value="newest">Date(Newest First)</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="table align-middle table-hover">
          <thead className="table-success">
            <tr>
              <th>APPLICANT NO</th>
              <th>APPLICANT NAME</th>
              <th>APPLICATION DATE</th>
              <th>DOCUMENT STATUS</th>
              <th>CREDIT SCORE</th>
              <th>APPROVED LIMIT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((r) => {
              const isDisabled = disabledIds.has(r.id);
              return (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.date}</td>
                  <td>
                    <span className="badge text-bg-success">{r.doc}</span>
                  </td>
                  <td>{r.score}</td>
                  <td>{r.limit}</td>
                  <td>
                    <button
                      className={`btn btn-sm ${
                        r.action === 'Approved' ? 'btn-success' : 'btn-danger'
                      }`}
                      onClick={() => handleActionClick(r)}
                      disabled={isDisabled}
                    >
                      {r.action}
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredAndSorted.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-muted py-4">
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Modal markup */}
      <div className="modal fade" tabIndex="-1" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Email sent!</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => bsModal.current?.hide()}
              ></button>
            </div>
            <div className="modal-body text-center">
              <p className="mb-1">Notification sent to {who?.name}</p>
              <p className="text-muted">
                "Your credit card request is Approved."
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => bsModal.current?.hide()}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 small text-muted">
        Note: When credit card is approved, an automatic email is sent: "Your
        Credit Card Request is Approved."
      </p>
    </div>
  );
}
