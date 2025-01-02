import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Serivces from "./Pages/Serivces";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// admin
import Dashboard from "./admin/Pages/Dashboard";
import VerifyOtp from "./Pages/VerifyOtp";
import User from "./Users/Pages/User";
import Profile from "./Users/Pages/Profile";
import Change_password from "./Users/Pages/Change_password";
import PrivateRoute from "./Pages/PrivateRoute";
import Admin_login from "./admin/Pages/Admin_login";
import AdminRoute from "./admin/Pages/AdminRoute";
import ForgotPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import Chart_Account from "./Users/Pages/Chart_Account";
import Profit_Loss from "./Users/Pages/Profint_Loss";
import Balance_sheet from "./Users/Pages/Balance_sheet";
import Customer_master from "./Users/Pages/Customer_master";
import Vendor_master from "./Users/Pages/Vendor_master";
import PurchaseModule from "./Users/Pages/PurchaseModule";
import Bank_receipt from "./Users/Pages/Bank_receipt";
import Bank_reconciliation from "./Users/Pages/Bank_reconciliation";
import Journal from "./Users/Pages/Journal";
import Bank_payment from "./Users/Pages/Bank_payment";
import Manage_user from "./admin/Pages/Manage_user";
import View_customer from "./Users/Pages/View_customer";
import View_vendor from "./Users/Pages/View_vendor";
import SalesInvoice from "./Users/Pages/SalesInvoice";
import CreditMemo from "./Users/Pages/CreditMemo";
import AccountReport from "./Users/Pages/AccountReport";
import CustomerLedger from "./Users/Pages/CustomerLedger";
import PurchaseInvoice from "./Users/Pages/PurchaseInvoice";
import DebitMemo from "./Users/Pages/DebitMemo";
import VendorLedger from "./Users/Pages/VendorLedger";
import AccountPaybleReport from "./Users/Pages/AccountPaybleReport";
import CreateCompany from "./Users/Pages/CreateCompany";
import ViewSalesInvoice from "./Users/Pages/ViewSalesInvoice";
import InactiveCustomer from "./Users/Pages/InactiveCustomer";
import BusinessType from "./admin/Pages/BusinessType";
import ViewBusinesses from "./admin/Pages/ViewBusinesses";
import Country from "./admin/Pages/Country";
import Province from "./admin/Pages/Province";
import ViewCountry from "./admin/Pages/ViewCountry";
import ViewProvince from "./admin/Pages/ViewProvince";
import BillingInformation from "./Users/Pages/BillingInformation";
import CompanyList from "./Users/Pages/CompanyList";
import Currency from "./admin/Pages/Currency";
import ViewCurrency from "./admin/Pages/ViewCurrency";
import Tax from "./admin/Pages/Tax";
import ViewTax from "./admin/Pages/ViewTax";
import PaymentTerms from "./admin/Pages/PaymentTerms";
import ViewPaymentterms from "./admin/Pages/ViewPaymentterms";
import TaxTable from "./Users/Pages/TaxTable";
import PaymenttermTable from "./Users/Pages/PaymenttermTable";
import ContraEntries from "./Users/Pages/ContraEntries";
import ViewCreditMemo from "./Users/Pages/ViewCreditMemo";
import ViewCreditmemoitems from "./Users/Pages/ViewCreditmemoitems";
import ViewPurchaseInvoice from "./Users/Pages/ViewPurchaseInvoice";
import ViewPurchaseInvoiceItems from "./Users/Pages/ViewpurchaseInvoiceItems";
import ViewSalesInvoiceItems from "./Users/Pages/ViewSalesInvoiceItems";


function App() {
	return (
		<>
			{/* <Header /> */}
			{/* <Footer /> */}
			{/* <Home /> */}
			{/* <About /> */}
			{/* <Serivces /> */}
			{/* <Login /> */}
			{/* <Signup /> */}
			{/* <Slidebar /> */}
			{/* <ForgotPassword /> */}
			{/* <ResetPassword /> */}

			{/* admin */}
			{/* <Aheader /> */}
			{/* <Slidnav /> */}
			{/* <Dashboard /> */}
			{/* <VerifyOtp /> */}
			{/* <Admin_login /> */}
			{/* <Manage_user /> */}
			{/* <Manage_customer /> */}
			{/* <Manage_vendor /> */}
			{/* <BusinessType /> */}
			{/* <ViewBusinesses /> */}
			{/* <Country /> */}
			{/* <City /> */}
			{/* <Province /> */}
			{/* <ViewCountry /> */}
			{/* <ViewProvince /> */}
			{/* <CountryCode /> */}
			{/* <Tax/> */}
			{/* <ViewTax /> */}
			{/* <PaymentTerms/> */}
			{/* <ViewPaymentterms /> */}




			{/* users */}

			{/* <User /> */}
			{/* <BSlidnav /> */}
			{/* <Bfooter /> */}
			{/* <BDashboard /> */}
			{/* <Profile /> */}
			{/* <Change_password /> */}
			{/* <Chart_Account /> */}
			{/* <Profit_Loss /> */}
			{/* <Balance_sheet /> */}
			{/* <Customer_master /> */}
			{/* <Vendor_master /> */}
			{/* <Customer_statement /> */}
			{/* <Sales_module /> */}
			{/* <Purchase_module /> */}
			{/* <Bank_payment/> */}
			{/* <Bank_receipt /> */}
			{/* <Bank_reconciliation /> */}
			{/* <Journal /> */}
			{/* <Reports /> */}
			{/* <View_vendor/> */}
			{/* <Credit_Memo/> */}
			{/* <Account_Report/> */}
			{/* <Customer_Ledger/> */}
			{/* <Purchase_Invoice /> */}
			{/* <DebitMemo /> */}
			{/* <VendorLedger /> */}
			{/* <AccountPaybleReport /> */}
			{/* <CreateCompany /> */}
			{/* <EditCompany/> */}
			{/* <ViewSalesInvoice /> */}
			{/* <InactiveCustomer /> */}
			{/* <BillingInformation /> */}
			{/* <CompanyList /> */}
			{/* <ViewCurrency /> */}
			{/* <TaxTable /> */}
			{/* <PaymenttermTable /> */}
			{/* <CreatTax /> */}
			{/* <CreatePaymentterm /> */}
			{/* <ContraEntries /> */}
			{/* <ViewCreditMemo /> */}
			{/* <ViewCreditMemo /> */}
			{/* <ViewPurchaseInvoice /> */}
			{/* <ViewPurchaseInvoiceItems /> */}
			{/* <ViewSalesInvoiceItems /> */}



			<BrowserRouter>
				<ToastContainer></ToastContainer>
				<Routes>
					{/* website */}
					<Route path="/" element={<Home />}></Route>
					<Route path="/about" element={<About />}></Route>
					<Route path="/service" element={<Serivces />}></Route>
					<Route path="/signup" element={<Signup />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/verify-otp" element={<VerifyOtp />}></Route>
					<Route path="/forget-password" element={<><ForgotPassword /></>}></Route>
					<Route path="/reset-password/:resetToken" element={<ResetPassword />} />
					{/* Admin */}
					<Route path="/admin/login" element={<Admin_login />}></Route>
					<Route element={<AdminRoute />}>
						<Route path="/dashboard" element={<Dashboard />} />
					</Route>
					<Route path="/manage-user" element={<Manage_user />}></Route>
					<Route path="/business-type" element={<BusinessType />}></Route>
					<Route path="/view-businesses" element={<ViewBusinesses />}></Route>
					<Route path="/country" element={<Country />}></Route>
					<Route path="/view-country" element={<ViewCountry />}></Route>
					<Route path="/province" element={<Province />}></Route>
					<Route path="/view-province" element={<ViewProvince />}></Route>
					<Route path="/currency" element={<Currency />}></Route>
					<Route path="/view-currency" element={<ViewCurrency />}></Route>
					<Route path="/tax" element={<Tax />}></Route>
					<Route path="/view-tax" element={<ViewTax />}></Route>
					<Route path="/payment-terms" element={<PaymentTerms />}></Route>
					<Route path="/view-paymentterms" element={<ViewPaymentterms />}></Route>


					{/* users */}
					<Route
						path="/user"
						element={
							<PrivateRoute>
								<User />
							</PrivateRoute>
						}
					></Route>
					<Route path="/profile" element={<Profile />}></Route>
					<Route path="/change_password" element={<Change_password />}></Route>
					<Route path="/chart-account" element={<Chart_Account />}></Route>
					<Route path="/profit-loss" element={<Profit_Loss />}></Route>
					<Route path="/balance-sheet" element={<Balance_sheet />}></Route>
					<Route path="/customer-master" element={<Customer_master />}></Route>
					<Route path="/vendor-master" element={<Vendor_master />}></Route>
					<Route path="/vendor-ledger" element={<VendorLedger />}></Route>
					<Route path="/sales-invoice" element={< SalesInvoice />}></Route >
					<Route path="/purchase-module" element={<PurchaseModule />}></Route>
					<Route path="/bank-payment" element={<Bank_payment />}></Route>
					<Route path="/bank-receipt" element={<Bank_receipt />}></Route >
					<Route path="/bank-reconciliation" element={<Bank_reconciliation />}></Route >
					<Route path="/journal" element={<Journal />}></Route >
					<Route path="/view-customer" element={<View_customer />}></Route >
					<Route path="/view-vendor" element={<View_vendor />}></Route >
					<Route path="/credit-memo" element={<CreditMemo />}></Route >
					<Route path="/account-report" element={<AccountReport />}></Route >
					<Route path="/customer-ledger" element={<CustomerLedger />}></Route >
					<Route path="/purchase-invoice" element={<PurchaseInvoice />}></Route >
					<Route path="/debit-memo" element={<DebitMemo />}></Route >
					<Route path="/accountpayble-report" element={<AccountPaybleReport />}></Route >
					<Route path="/create-company" element={<CreateCompany />}></Route >
					<Route path="/view-sales-invoice" element={<ViewSalesInvoice />}></Route >
					<Route path="/salesinvoice-items/:invoiceId" element={<ViewSalesInvoiceItems />}></Route >
					<Route path="/inactive-customer" element={<InactiveCustomer />}></Route >
					<Route path="/biling-information" element={<BillingInformation />}></Route >
					<Route path="/company-list" element={<CompanyList />}></Route >
					<Route path="/tax-table" element={<TaxTable />}></Route >
					<Route path="/paymentterm-table" element={< PaymenttermTable />}></Route >
					<Route path="/contra-entries" element={< ContraEntries />}></Route >
					<Route path="/view-creditmemo" element={< ViewCreditMemo />}></Route >
					<Route path="/creditmemo-items/:creditmemoId" element={< ViewCreditmemoitems />}></Route >
					<Route path="/view-purchaseinvoice" element={< ViewPurchaseInvoice />}></Route >
					<Route path="/purchaseinvoice-items/:purchaseinvoiceId" element={< ViewPurchaseInvoiceItems />}></Route >
				</ Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
