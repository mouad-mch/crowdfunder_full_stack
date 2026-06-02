import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { TrendingUp, Briefcase, ArrowRight } from "lucide-react";
import { fetchPortfolio, clearError } from "../store/slices/investmentSlice";

const formatMoney = (amount) =>
  `MAD ${Number(amount ?? 0).toLocaleString()}`;

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Portfolio = () => {
  const dispatch = useDispatch();
  const { portfolio, loading, error } = useSelector((state) => state.investments);

  useEffect(() => {
    dispatch(fetchPortfolio());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-muted rounded w-1/4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-24 bg-muted rounded-lg" />
          <div className="h-24 bg-muted rounded-lg" />
        </div>
        <div className="h-48 bg-muted rounded-lg" />
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Portfolio</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your investments and ownership stakes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card p-5 border border-border rounded-lg flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Invested</p>
            <p className="text-xl font-bold">{formatMoney(portfolio?.totalInvested)}</p>
          </div>
        </div>
        <div className="card p-5 border border-border rounded-lg flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Briefcase size={20} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Projects Funded</p>
            <p className="text-xl font-bold">{portfolio?.investmentsCount ?? 0}</p>
          </div>
        </div>
      </div>

  
      <div className="card border border-border rounded-lg overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="font-semibold">Investment History</h2>
        </div>

        {!portfolio?.investments?.length ? (
          <div className="p-10 text-center text-muted-foreground text-sm">
            No investments yet. Browse open projects to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-muted-foreground text-left">
                  <th className="px-5 py-3 font-medium">Project</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Stake</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {portfolio.investments.map((inv) => (
                  <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-4 font-medium">
                      {inv.project?.title ?? "—"}
                    </td>
                    <td className="px-5 py-4">{formatMoney(inv.amount)}</td>
                    <td className="px-5 py-4">{inv.percentage}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                        inv.project?.status === "open"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {inv.project?.status ?? "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(inv.investedAt)}
                    </td>
                    <td className="px-5 py-4">
                      {inv.project?._id && (
                        <Link
                          to={`/projects/${inv.project._id}`}
                          className="flex items-center gap-1 text-primary hover:underline text-xs"
                        >
                          View <ArrowRight size={12} />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
