/** @format */

import React from "react";

const TermsPage = () => {
  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-2 sm:space-y-3 md:space-y-4">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 ">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            Effective Date: 25/02/2026
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Company: Mizziburlo
            <br />
            Address: Villaggio San Giuseppe, Gawhra, Triq il-Wardija, Il-Qala,
            Malta
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            1. Overview
          </h2>
          <p className="mb-4">
            These Terms govern access to and use of Wellobb, an Enterprise
            Service Management system developed and operated by Mizziburlo. The
            platform supports service job lifecycle management, maintenance
            tracking, inventory coordination, billing integrations, and field
            service operations. By accessing or using Wellobb, you agree to
            these Terms.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            2. Nature of Service
          </h2>
          <p className="mb-4">
            Wellobb is a business software platform provided primarily to
            organisations managing installation, maintenance, and repair
            operations. The system:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Supports administrative and technician workflows</li>
            <li>Integrates with third-party services such as QuickBooks</li>
            <li>
              Stores operational job data, customer details, and service records
            </li>
            <li>Provides reporting, scheduling, and audit capabilities</li>
          </ul>
          <p className="mb-4">
            Wellobb is not a financial institution, accounting firm, or legal
            advisor.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            3. License & Use Rights
          </h2>
          <p className="mb-4">
            Mizziburlo grants a non-exclusive, non-transferable license to use
            Wellobb solely for internal business operations. You agree not to:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Reverse engineer or replicate the system</li>
            <li>Resell or sublicense access without permission</li>
            <li>Use the system unlawfully</li>
            <li>Attempt unauthorised system access</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            4. Fees & Commercial Terms
          </h2>
          <p className="mb-4">
            Wellobb is typically licensed via a one-time implementation or
            system fee, with optional ongoing support or maintenance agreements.
            Unless explicitly agreed:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Fees are non-refundable</li>
            <li>Payment processing is handled outside the platform</li>
            <li>
              Failure to maintain support agreements may limit updates or
              assistance
            </li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            5. Data Responsibility
          </h2>
          <p className="mb-4">Clients remain responsible for:</p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Accuracy of operational and customer data</li>
            <li>Compliance with applicable data protection laws</li>
            <li>Obtaining consent from their own customers where required</li>
          </ul>
          <p className="mb-4">
            Mizziburlo acts primarily as a data processor for client operational
            data.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            6. QuickBooks Integration
          </h2>
          <p className="mb-4">Where QuickBooks integration is enabled:</p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>
              Wellobb may synchronise selected data such as invoices, customer
              records, and product information to support operational workflows.
            </li>
            <li>QuickBooks remains the authoritative accounting record.</li>
            <li>
              Data stored within Wellobb is retained strictly for operational
              reference and workflow continuity.
            </li>
            <li>
              Wellobb does not independently generate official accounting
              records or financial statements.
            </li>
            <li>
              Users remain responsible for verifying accounting accuracy within
              QuickBooks.
            </li>
            <li>
              Integration access credentials are securely stored using
              industry-standard security practices.
            </li>
            <li>Users may disconnect integrations at any time.</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            7. Data Security
          </h2>
          <p className="mb-4">
            Mizziburlo implements reasonable technical and organisational
            security measures including:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Secure cloud hosting infrastructure</li>
            <li>Encrypted data transmission</li>
            <li>Controlled system access</li>
            <li>Regular system monitoring</li>
          </ul>
          <p className="mb-4">
            However, no system can guarantee absolute security.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            8. Data Retention
          </h2>
          <p className="mb-4">Operational data is retained:</p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>For the duration of the client relationship</li>
            <li>Up to 90 days after termination for export/backups</li>
            <li>
              After which it may be permanently deleted unless legally required
              otherwise
            </li>
          </ul>
          <p className="mb-4">(This protects you operationally.)</p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            9. Limitation of Liability
          </h2>
          <p className="mb-4">To the maximum extent permitted by law:</p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>
              Mizziburlo shall not be liable for indirect, incidental, or
              consequential damages
            </li>
            <li>
              Total liability shall not exceed the amount paid for the system or
              €18,000, whichever is lower
            </li>
            <li>
              Mizziburlo is not responsible for accounting accuracy, financial
              reporting, or regulatory compliance arising from third-party
              integrations including QuickBooks.
            </li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            10. Warranty Disclaimer
          </h2>
          <p className="mb-4">
            Wellobb is provided "as is" without warranties of:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Continuous uptime</li>
            <li>Error-free operation</li>
            <li>Fitness for specific business purposes</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            11. Termination
          </h2>
          <p className="mb-4">
            Either party may terminate system use subject to commercial
            agreements. Upon termination:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Access may be revoked</li>
            <li>Data export may be provided on request</li>
            <li>Remaining data will be deleted per retention policy</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            12. Governing Law
          </h2>
          <p className="mb-4">
            These Terms are governed by the laws of Malta. Disputes shall be
            resolved exclusively in the courts of Malta.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            13. Contact
          </h2>
          <p className="mb-4">
            Mizziburlo
            <br />
            chris@mizziburlo.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
