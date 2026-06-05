import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Wallet as WalletIcon, Plus } from "lucide-react";
import { fetchBalance, deposit, clearError } from "../store/slices/walletSlice";

const Wallet = () => {

  const {balance, loading, error} = useSelector((state) => state.wallet)
  const { user } = useSelector((state) => state.auth);

  const [amount, setAmount] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if(user?._id) {
      dispatch(fetchBalance(user._id))
    }
  }, [user, dispatch])

  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleDeposit = async (e) => {
    e.preventDefault();

    if(!amount || Number(amount) <=0) {
      toast.error("Enter a valid amount");
      return
    }

    const res = await dispatch(deposit({ amount: Number(amount) }));
    if(deposit.fulfilled.match(res)) {
      toast.success("Balance updated succesfully");
      setAmount("");
    } else {
      toast.error(res.payload || "Deposit failed")
    }

  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Wallet</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your balance and top up funds.
        </p>
      </div>

      <div className="card p-6 border border-border rounded-lg flex items-center gap-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <WalletIcon size={24} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Available Balance</p>
          {loading ? (
            <div className="h-7 w-32 bg-muted rounded animate-pulse mt-1" />
          ) : (
            <p className="text-2xl font-bold">
              MAD {Number(balance ?? 0).toLocaleString()}
            </p>
          )}
        </div>
      </div>

   
      <div className="card p-6 border border-border rounded-lg">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Plus size={18} />
          Top Up Balance
        </h2>
        <form onSubmit={handleDeposit} className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm text-muted-foreground mb-1">
              Amount (MAD)
            </label>
            <input
              type="number"
              min="1"
              className="w-full border border-border rounded-md p-2 bg-background text-foreground"
              placeholder="e.g. 5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="h-10 px-5 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/80 disabled:opacity-50 transition-colors"
          >
            {loading ? "Processing..." : "Deposit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Wallet;
