import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Api from '../../api';
import Pagination from '../../components/Pagination';
import LayoutDefault from '../../layouts/Default';

export default function StatisticsIndex() {
  document.title = 'Statistics - Unitech Test';

  const [statistics, setStatistics] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const [keywords, setKeywords] = useState('');

  const access_token = Cookies.get('access_token');

  const fetchData = async (pageNumber = 1, keywords = '') => {
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/v1/statistics?search=${keywords}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((response) => {
      setStatistics(response.data.data.data);

      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchData = async (e) => {
    setKeywords(e.target.value);

    fetchData(1, e.target.value);
  };

  return (
    <LayoutDefault>
      <div className="container-fluid mb-5 mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="row"></div>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-md-12">
            <div className="card border-0 shadow">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-centered mb-0 rounded">
                    <thead className="thead-dark">
                      <tr className="border-0">
                        <th className="border-0" style={{ width: '5%' }}>
                          No.
                        </th>
                        <th className="border-0 text-center">ID</th>
                        <th className="border-0 text-center">Review</th>
                        <th className="border-0 text-center">Rating</th>
                        <th className="border-0 text-center">Average Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statistics.length > 0 ? (
                        statistics.map((statistic, index) => (
                          <tr key={index}>
                            <td className="fw-bold text-center">
                              {++index +
                                (pagination.currentPage - 1) *
                                  pagination.perPage}
                            </td>
                            <td className="text-center">{statistic.id}</td>
                            <td className="text-center">
                              {statistic.review_count}
                            </td>
                            <td className="text-center">{statistic.rating}</td>
                            <td className="text-center">
                              {statistic.average_rating}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={12}>
                            <div
                              className="alert alert-danger border-0 rounded shadow-sm w-100"
                              role="alert"
                            >
                              Data Belum Tersedia!.
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={pagination.currentPage}
                  perPage={pagination.perPage}
                  total={pagination.total}
                  onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                  position="end"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
