import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProjectInvestors, clearError } from "../store/slices/projectsSlice";

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount ?? 0);

const formatDate = (dateStr) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "—";

const Investors = () => {
  const { id } = useParams();
  const { investors, error } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectInvestors(id));
    return () => dispatch(clearError());
  }, [id, dispatch]);

  return (
    <div className="card border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-semibold">Project investors</h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          {investors.length} investor{investors.length !== 1 ? "s" : ""}
        </p>
      </div>

      {error && (
        <div className="px-6 py-3 text-sm text-red-500">{error}</div>
      )}

      {investors.length === 0 ? (
        <div className="px-6 py-10 text-center text-sm text-muted-foreground">
          No investments yet.
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wide">
              <th className="px-6 py-3 text-left font-medium">Investor</th>
              <th className="px-6 py-3 text-right font-medium">Amount</th>
              <th className="px-6 py-3 text-right font-medium">Share</th>
              <th className="px-6 py-3 text-right font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {investors.map((inv, i) => {
              const shortId = String(inv.investor).slice(-6);
              return (
                <tr
                  key={i}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-semibold uppercase">
                        {shortId.slice(0, 2)}
                      </div>
                      <span className="font-medium">Investor #{shortId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold">
                    {formatMoney(inv.amount)}
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {inv.percentage}
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {formatDate(inv.investedAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Investors;
