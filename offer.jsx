import React, { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

const API_BASE = "http://localhost:8080";

export default function OfferConfirmation() {
  const [data, setData] = useState([]); 
  const [who, setWho] = useState(null);
  const [disabledIds, setDisabledIds] = useState(new Set());
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [sortDir, setSortDir] = useState("oldest");
  const [loading, setLoading] = useState(true);

  const modalRef = useRef(null);
  const bsModal = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (modalRef.current && !bsModal.current) {
      bsModal.current = new Modal(modalRef.current, {
        backdrop: "static",
        keyboard: true,
      });
    }
  }, []);

  // ✅ Fetch Approved Applications from backend
  const fetchApprovedData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/offer/approved`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(res.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedData();
  }, []);

  const toTime = (d) => new Date(d).getTime();

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = data.filter((r) => {
      const s = r.fullName?.toLowerCase() || "";
      const matchesSearch = q === "" || s.includes(q);
      const matchesStatus = status === "All" || r.documentVerificationStatus === status;
      return matchesSearch && matchesStatus;
    });

    rows = rows.sort((a, b) => {
      const ta = toTime(a.submittedAt);
      const tb = toTime(b.submittedAt);
      return sortDir === "oldest" ? ta - tb : tb - ta;
    });

    return rows;
  }, [data, query, status, sortDir]);

  // ✅ Fetch Credit Score on Approve Click
  const handleActionClick = async (row) => {
    if (disabledIds.has(row.appId)) return;
    setDisabledIds((prev) => new Set(prev).add(row.appId));

    try {
      const res = await axios.get(
        `${API_BASE}/api/offer/credit-score/${row.appId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedrow = {...row,...res.data};

      setWho(updatedrow);
      
      bsModal.current?.show();

    } catch (err) {
      console.error("Credit Score Fetch Error:", err);
      alert("Unable to generate credit score!");
    }
  };

  

  return (
    <div className="container py-4">
      <h1 className="mb-3" style={{ backgroundImage: "linear-gradient(to bottom, #007b8f, #00434e)", WebkitBackgroundClip: "text", color: "transparent" }}>Offer Confirmation</h1>

      {/* 🔍 Search + Filters */}
      <div className="mb-3 d-flex gap-2 flex-wrap">
        <input className="form-control" style={{ maxWidth: 260 }} placeholder="search by name"
          value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="form-select" style={{ maxWidth: 180 }}
          value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <select className="form-select" style={{ maxWidth: 200 }}
          value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
          <option value="oldest">Date (Oldest First)</option>
          <option value="newest">Date (Newest First)</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle table-hover">
            <thead>
              <tr>
                <th>APPLICANT NO</th>
                <th>APPLICANT NAME</th>
                <th>APPLICATION DATE</th>
                <th>DOCUMENT STATUS</th>
                <th style={{marginBottom:"50px"}}>Card Type</th>
                <th style={{width:"50px"}}>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredAndSorted.map((r) => {
                const isDisabled = disabledIds.has(r.appId);
                return (
                  <tr key={r.appId}>
                    <td>{r.appId.substring(0,8)}</td>
                    <td>{r.fullName}</td>
                    <td>{r.submittedAt?.split("T")[0]}</td>
                    <td><span className="badge text-bg" style={{backgroundColor:"#086876ff" , color:"white"}}>{r.documentVerificationStatus}</span></td>
                    <td>{r.cardType || "-"}</td>

                     <td style={{minWidth:110 }}>
                       <div className='d-flex gap-1 flex-wrap w-100'>
                                 <button className="btn btn-sm  " style={{backgroundColor:"#086876ff" , color:"white"}}
                               onClick={() => handleActionClick(r)}
                       disabled={isDisabled}>Approve
                      </button>
                        <button
                       className="btn btn-sm  " style={{backgroundColor:"#ef5a5a" ,color:"white"}}
                       onClick={() => handleActionClick(r)}
                        disabled={isDisabled}
                          >
                            Reject
                         </button>
                       </div>
                 </td>
                  </tr>
                );
              })}

              {filteredAndSorted.length === 0 && (
                <tr><td colSpan="6" className="text-center text-muted py-3">No results</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Modal */}
      <div className="modal fade" tabIndex="-1" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center">
            <div className="modal-header">
              <h5 className="modal-title">Credit Score Generated ✅</h5>
              <button className="btn-close" onClick={() => bsModal.current?.hide()}></button>
            </div>
            <div className="modal-body">
              <h5>{who?.fullName}</h5>
              <p className="fw-bold fs-4">{who?.creditScore}</p>
              <p className="text-muted">{who?.creditRating}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => bsModal.current?.hide()}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 small text-muted">
        When credit score is generated, notification is sent automatically.
      </p>
    </div>
  );
}





// get
import React, { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

const API_BASE = "http://localhost:8080";

export default function OfferConfirmation() {
  const [data, setData] = useState([]);
  const [who, setWho] = useState(null);
  const [disabledIds, setDisabledIds] = useState(new Set());
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [sortDir, setSortDir] = useState("oldest");
  const [loading, setLoading] = useState(true);

  const [rejectReason, setRejectReason] = useState("");
  const [actionWho, setActionWho] = useState(null);

  const modalRef = useRef(null);
  const bsModal = useRef(null);

  const token = localStorage.getItem("token");

  // ✅ Init Credit Score Modal
  useEffect(() => {
    if (modalRef.current && !bsModal.current) {
      bsModal.current = new Modal(modalRef.current, {
        backdrop: "static",
        keyboard: true,
      });
    }
  }, []);

  // ✅ Fetch Approved Applications
  const fetchApprovedData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/offer/approved`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedData();
  }, []);

  const toTime = (d) => new Date(d).getTime();

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = data.filter((r) => {
      const s = r.fullName?.toLowerCase() || "";
      const searchMatch = q === "" || s.includes(q);
      const statusMatch = status === "All" || r.documentVerificationStatus === status;
      return searchMatch && statusMatch;
    });

    return rows.sort((a, b) =>
      sortDir === "oldest"
        ? toTime(a.submittedAt) - toTime(b.submittedAt)
        : toTime(b.submittedAt) - toTime(a.submittedAt)
    );
  }, [data, query, status, sortDir]);

  // ✅ Click → Fetch Credit Score → Show Modal
  const handleActionClick = async (row) => {
    if (disabledIds.has(row.appId)) return;

    setDisabledIds((prev) => new Set(prev).add(row.appId));

    try {
      const res = await axios.get(`${API_BASE}/api/offer/credit-score/${row.appId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedRow = { ...row, ...res.data };
      setWho(updatedRow);
      bsModal.current?.show();
    } catch (err) {
      console.error("Credit Score Error:", err);
      alert("Unable to generate credit score!");
      setDisabledIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(row.appId);
        return newSet;
      });
    }
  };

  // ✅ Approve/Reject API call
  const processOffer = async (row, action) => {
    try {
      const payload = {
        appId: row.appId,
        action,
        creditScore: row.creditScore,
      };

      if (action === "REJECTED") {
        payload.rejectReason = rejectReason;
      }

      await axios.post(`${API_BASE}/api/offer/process`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(`✅ Application ${action}`);
      fetchApprovedData(); // Refresh table
      setRejectReason("");
      bsModal.current?.hide();
    } catch (err) {
      console.error("Offer Process Error:", err);
      alert("❌ Failed to update status");
    }
  };

  // ✅ Reject Modal Controls
  const openRejectPopup = (row) => {
    setActionWho(row);
    const mdl = new Modal(document.getElementById("rejectModal"));
    mdl.show();
  };

  const confirmReject = () => {
    const mdl = Modal.getInstance(document.getElementById("rejectModal"));
    mdl.hide();
    processOffer(actionWho, "REJECTED");
  };

  return (
    <div className="container py-4">
      <h1 className="mb-3"
        style={{ backgroundImage: "linear-gradient(to bottom, #007b8f, #00434e)", WebkitBackgroundClip: "text", color: "transparent" }}>
        Offer Confirmation
      </h1>

      {/* 🔍 Filters */}
      <div className="mb-3 d-flex gap-2 flex-wrap">
        <input className="form-control" style={{ maxWidth: 260 }}
          placeholder="search by name"
          value={query} onChange={(e) => setQuery(e.target.value)} />

        <select className="form-select" style={{ maxWidth: 180 }}
          value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <select className="form-select" style={{ maxWidth: 200 }}
          value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
          <option value="oldest">Date (Oldest First)</option>
          <option value="newest">Date (Newest First)</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle table-hover">
            <thead>
              <tr>
                <th>APPLICANT NO</th>
                <th>APPLICANT NAME</th>
                <th>APPLICATION DATE</th>
                <th>DOCUMENT STATUS</th>
                <th>Card Type</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredAndSorted.map((r) => {
                const isDisabled = disabledIds.has(r.appId);
                return (
                  <tr key={r.appId}>
                    <td>{r.appId.substring(0, 8)}</td>
                    <td>{r.fullName}</td>
                    <td>{r.submittedAt?.split("T")[0]}</td>

                    <td><span className="badge" style={{ backgroundColor: "#086876ff", color: "white" }}>
                      {r.documentVerificationStatus}
                    </span></td>

                    <td>{r.cardType || "-"}</td>

                    <td style={{ minWidth: 110 }}>
                      <div className="d-flex gap-1 flex-wrap w-100">
                        <button
                          className="btn btn-sm"
                          style={{ backgroundColor: "#086876ff", color: "white" }}
                          onClick={() => handleActionClick(r)}
                          disabled={isDisabled}>
                          Approve
                        </button>

                        <button
                          className="btn btn-sm"
                          style={{ backgroundColor: "#ef5a5a", color: "white" }}
                          onClick={() => openRejectPopup(r)}
                          disabled={isDisabled}>
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredAndSorted.length === 0 && (
                <tr><td colSpan="6" className="text-center text-muted py-3">No results</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Credit Score Modal */}
      <div className="modal fade" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center">
            <div className="modal-header">
              <h5 className="modal-title">Credit Score Generated ✅</h5>
              <button className="btn-close" onClick={() => bsModal.current?.hide()}></button>
            </div>

            <div className="modal-body">
              <h5>{who?.fullName}</h5>
              <p className="fw-bold fs-4">{who?.creditScore}</p>
              <p className="text-muted">{who?.creditRating}</p>
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => processOffer(who, "APPROVED")}>
                Confirm Approve ✅
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ❌ Reject Reason Modal */}
      <div className="modal fade" id="rejectModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Reject Offer</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <label className="form-label">Reason for Rejection</label>
              <textarea
                className="form-control"
                rows="3"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmReject}>
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 small text-muted">
        When credit score is generated, notification is sent automatically.
      </p>
    </div>
  );
}





<td style={{ minWidth: 110 }}>
  {r.offerStatus === "APPROVED" ? (
    <span className="badge bg-success">✅ Approved</span>
  ) : r.offerStatus === "REJECTED" ? (
    <span className="badge bg-danger">❌ Rejected</span>
  ) : (
    <div className="d-flex gap-1 flex-wrap w-100">
      <button
        className="btn btn-sm"
        style={{ backgroundColor: "#086876ff", color: "white" }}
        onClick={() => handleActionClick(r)}
      >
        Approve
      </button>

      <button
        className="btn btn-sm"
        style={{ backgroundColor: "#ef5a5a", color: "white" }}
        onClick={() => openRejectPopup(r)}
      >
        Reject
      </button>
    </div>
  )}
</td>

// finish




































import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Modal } from 'bootstrap';




export default function OfferConfirmation() {
  const [who, setWho] = useState(null);
  const [disabledIds, setDisabledIds] = useState(new Set());
  const [query, setQuery] = useState(''); 
  const [status, setStatus] = useState('All'); 
  const [sortDir, setSortDir] = useState('oldest'); 

  const modalRef = useRef(null);
  const bsModal = useRef(null);

  useEffect(() => {
    if (modalRef.current && !bsModal.current) {
      bsModal.current = new Modal(modalRef.current, {
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

  
  const toTime = (d) => new Date(d).getTime();


  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = data.filter((r) => {
      const matchesSearch = q === '' || r.name.toLowerCase().includes(q); 
      const matchesStatus = status === 'All' || r.action === status; 
      return matchesSearch && matchesStatus;
    });

    rows = rows.sort((a, b) => {
      const ta = toTime(a.date);
      const tb = toTime(b.date);
      return sortDir === 'oldest' ? ta - tb : tb - ta; 
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
    else if(row.action === 'Rejected'){
      alert(`Notification sent to ${row.name}: Your credit card request is Rejected.`)
    }
  };

  return (
    <div className="container py-4">
      <div className='header-ledt'>
          <h1 className="mb-3 " style={{ backgroundImage:"linear-gradient(to bottom, #007b8f, #00434e)" , WebkitBackgroundClip:"text" , backgroundClip:"text" , color:"transparent" , WebkitTextFillColor:"transparent"}}>Offer Confirmation</h1>
      </div>

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
          <option value={"Approved"}>Approved</option>
          <option value={"Rejected"}>Rejected</option>
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
          <thead className="" style={{color:""}}>
            <tr>
              <th>APPLICANT NO</th>
              <th>APPLICANT NAME</th>
              <th>APPLICATION DATE</th>
              <th>DOCUMENT STATUS</th>
              <th>CREDIT SCORE</th>
              <th>APPROVED LIMIT</th>
              <th style={{ marginBottom:"30px"}}>ACTION</th>
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
                    <span className="badge text-bg" style={{backgroundColor:"#086876ff" , color:"white"}}>{r.doc}</span>
                  </td>
                  <td>{r.score}</td>
                  <td>{r.limit}</td>
                  

                  <td style={{minWidth:110 }}>
                       <div className='d-flex gap-1 flex-wrap w-100'>
                                 <button className="btn btn-sm  " style={{backgroundColor:"#086876ff" , color:"white"}}
                               onClick={() => handleActionClick({ ...r, action: 'Approved' })}
                       disabled={isDisabled}>Approve
                      </button>
                        <button
                       className="btn btn-sm  " style={{backgroundColor:"#ef5a5a" ,color:"white"}}
                       onClick={() => handleActionClick({ ...r, action: 'Rejected' })}
                        disabled={isDisabled}
                          >
                            Reject
                         </button>
                       </div>
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
                className="btn " style={{backgroundColor:"#035461ff" , color:"white"}}
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
