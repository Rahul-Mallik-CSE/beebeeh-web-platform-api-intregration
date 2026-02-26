/** @format */

import React from "react";

const PrivacyPage = () => {
  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-2 sm:space-y-3 md:space-y-4">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 ">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            Effective Date: 25/02/2026
          </p>
          <p className="text-sm text-gray-600 mb-6">Company: Mizziburlo</p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            1. Introduction
          </h2>
          <p className="mb-4">
            This Privacy Policy explains how Mizziburlo collects, uses, and
            protects data when organisations use the Wellobb system. This policy
            is designed to comply with the EU General Data Protection Regulation
            (GDPR).
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            2. Data We Collect
          </h2>
          <p className="mb-4">
            <strong>Business Account Data</strong>
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Names</li>
            <li>Email addresses</li>
            <li>Phone numbers</li>
            <li>Company details</li>
            <li>Addresses</li>
          </ul>
          <p className="mb-4">
            <strong>Operational Service Data</strong>
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Job records</li>
            <li>Maintenance history</li>
            <li>Product/service information</li>
            <li>Technician activity logs</li>
            <li>Digital signatures</li>
            <li>Photographic job evidence</li>
            <li>Location-related job data where applicable</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            3. QuickBooks Integration Data
          </h2>
          <p className="mb-4">
            If QuickBooks integration is enabled, Wellobb may access limited
            financial data such as:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Customer records</li>
            <li>Invoice summaries</li>
            <li>Product information</li>
          </ul>
          <p className="mb-4">
            This data is stored only to support operational workflows, job
            tracking, and service management. QuickBooks remains the
            authoritative accounting platform. Mizziburlo does not sell,
            monetise, or independently use financial data beyond providing
            system functionality.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            4. How Data Is Used
          </h2>
          <p className="mb-4">We use data to:</p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Operate the Wellobb platform</li>
            <li>Manage service workflows</li>
            <li>Sync accounting integrations</li>
            <li>Provide technical support</li>
            <li>
              Send transactional communications (e.g., appointment reminders)
            </li>
          </ul>
          <p className="mb-4">We do not use data for advertising.</p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            5. Legal Basis (GDPR)
          </h2>
          <p className="mb-4">Processing is based on:</p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Contractual necessity</li>
            <li>Legitimate business interests</li>
            <li>Legal obligations where applicable</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            6. Role Under Data Protection Law
          </h2>
          <p className="mb-4">
            For operational customer data entered by client organisations into
            Wellobb, Mizziburlo generally acts as a data processor, while the
            client organisation remains the data controller. For account
            management, support communications, and system administration data,
            Mizziburlo acts as a data controller.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            7. Hosting & Data Security
          </h2>
          <p className="mb-4">
            Wellobb is hosted on secure cloud infrastructure provided via
            Supabase, with primary data storage located in the European Union
            (AWS EU-West-1 – Ireland region). We implement reasonable technical
            and organisational safeguards including:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Encrypted data transmission (HTTPS/TLS)</li>
            <li>Controlled system access and authentication</li>
            <li>Secure cloud infrastructure practices</li>
            <li>Regular monitoring and operational safeguards</li>
          </ul>
          <p className="mb-4">
            Data is primarily stored within the European Economic Area (EEA) and
            is not intentionally transferred outside the EU unless required for
            specific service integrations or legal obligations.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            8. Data Retention
          </h2>
          <p className="mb-4">Operational data is retained:</p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>For the duration of the client relationship</li>
            <li>
              For up to 90 days after termination to allow data export or
              operational backup recovery
            </li>
            <li>
              After which data is securely deleted or anonymised unless legal
              obligations require retention
            </li>
          </ul>
          <p className="mb-4">
            Clients may request earlier deletion where technically feasible.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            9. Data Sharing
          </h2>
          <p className="mb-4">
            We do not sell personal data. Limited sharing may occur with:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Cloud infrastructure providers</li>
            <li>Integration partners (e.g., QuickBooks)</li>
            <li>Legal authorities where required</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            10. International Transfers
          </h2>
          <p className="mb-4">
            Where infrastructure providers operate internationally, appropriate
            safeguards are applied consistent with GDPR requirements.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            11. Data Subject Rights
          </h2>
          <p className="mb-4">Individuals may request:</p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Access to their data</li>
            <li>Correction of inaccuracies</li>
            <li>Deletion where legally permitted</li>
          </ul>
          <p className="mb-4">
            Requests should be directed to the client organisation controlling
            the data or to: chris@mizziburlo.com
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            12. Cookies & Tracking
          </h2>
          <p className="mb-4">
            Wellobb does not use advertising trackers or marketing pixels.
            Essential system cookies may be used for authentication and
            security.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            13. Policy Updates
          </h2>
          <p className="mb-4">
            This policy may be updated periodically. Continued system use
            constitutes acceptance.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            14. Contact
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

export default PrivacyPage;
