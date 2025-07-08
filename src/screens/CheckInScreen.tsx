import {
  CameraIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  CreditCardIcon,
  KeyRoundIcon,
  MapPinIcon,
  QrCodeIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import AppleWalletBadge from "~/assets/apple-wallet.svg";
import { Money } from "~/components/Money";
import { ProgressSteps } from "~/components/ProgressSteps";
import { TopNav } from "~/components/TopNav";
import { currentBooking, unitSpecs } from "~/config";

type CheckInStep = "summary" | "kyc" | "key";

type DocumentStatus = "none" | "uploading" | "extracting" | "extracted";

type KYCInfo = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  documentType: "passport" | "id";
  documentNumber: string;
  nationality: string;
  issuingCountry: string;
  issueDate: string;
  expiryDate: string;
};

export function CheckInScreen() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckInStep>("summary");
  const [kycInfo, setKycInfo] = useState<KYCInfo>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    documentType: "passport",
    documentNumber: "",
    nationality: "",
    issuingCountry: "",
    issueDate: "",
    expiryDate: "",
  });
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>("none");

  const unitSpec = unitSpecs[currentBooking.type];

  const stepTitles = {
    summary: "Check In",
    kyc: "Identity Verification",
    key: "Activate Room Key",
  };

  const getCurrentStepNumber = () => {
    switch (currentStep) {
      case "summary":
        return 1;
      case "kyc":
        return 2;
      case "key":
        return 3;
      default:
        return 1;
    }
  };

  const handleNextStep = () => {
    if (currentStep === "summary") {
      setCurrentStep("kyc");
    } else if (currentStep === "kyc") {
      setCurrentStep("key");
    }
  };

  const handleDocumentUpload = () => {
    // Simulate document photo upload
    setDocumentStatus("uploading");

    // Simulate processing transition
    setTimeout(() => {
      setDocumentStatus("extracting");
    }, 500);

    // Simulate AI extraction after a brief delay
    setTimeout(() => {
      setDocumentStatus("extracted");
      setKycInfo({
        ...kycInfo,
        firstName: "Max",
        lastName: "Mustermann",
        dateOfBirth: "1990-05-15",
        placeOfBirth: "Munich",
        documentNumber: "C01X00T47",
        nationality: "German",
        issuingCountry: "Germany",
        issueDate: "2020-05-15",
        expiryDate: "2030-05-15",
      });
    }, 2000);
  };

  const isKycComplete = () => {
    return (
      kycInfo.firstName &&
      kycInfo.lastName &&
      kycInfo.dateOfBirth &&
      kycInfo.placeOfBirth &&
      kycInfo.documentNumber &&
      kycInfo.nationality &&
      kycInfo.issuingCountry &&
      kycInfo.issueDate &&
      kycInfo.expiryDate
    );
  };

  return (
    <div className="flex h-full flex-col">
      <TopNav title={stepTitles[currentStep]} />

      <div className="flex flex-1 flex-col p-4">
        {/* Progress Steps */}
        <ProgressSteps
          currentStep={getCurrentStepNumber()}
          totalSteps={3}
          className="mb-6"
        />

        {/* Step 1: Rental Details */}
        {currentStep === "summary" && (
          <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6">
              {/* Welcome Section */}
              <div className="text-center">
                <h2 className="mb-3 text-xl font-bold">
                  Welcome to your new home!
                </h2>
                <p className="text-base-content/70">
                  You're just a few steps away from completing your check-in.
                  Please review your rental details below and confirm to
                  proceed.
                </p>
              </div>

              <div className="card border border-base-300 bg-base-100">
                <div className="card-body">
                  <h3 className="mb-4 card-title">Rental Summary</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPinIcon className="h-5 w-5 text-base-content/70" />
                        <span className="font-medium">Location</span>
                      </div>
                      <span className="text-base-content/70">
                        Munich City Center
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <unitSpec.icon className="h-5 w-5 text-base-content/70" />
                        <span className="font-medium">Apartment Type</span>
                      </div>
                      <span className="text-base-content/70">
                        {unitSpec.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <KeyRoundIcon className="h-5 w-5 text-base-content/70" />
                        <span className="font-medium">Duration</span>
                      </div>
                      <span className="text-base-content/70">
                        {currentBooking.months} months
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCardIcon className="h-5 w-5 text-base-content/70" />
                        <span className="font-medium">Monthly Rate</span>
                      </div>
                      <Money
                        amount={currentBooking.monthlyRent}
                        className="text-base-content/70"
                      />
                    </div>

                    <div className="flex items-center justify-between border-t border-base-300 pt-2">
                      <span className="font-medium">Check-in Date</span>
                      <span className="text-base-content/70">Today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="btn w-full btn-primary" onClick={handleNextStep}>
              Confirm Details
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Step 2: KYC Information */}
        {currentStep === "kyc" && (
          <div className="flex h-full flex-col gap-4">
            <div className="flex-1 space-y-3">
              <div className="text-center">
                <p className="mb-4 text-base-content/70">
                  Please provide your identification document for verification
                  as required by local regulations.
                </p>
              </div>

              {/* Document Photo Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Auto-fill from document (optional)
                  </span>
                </label>
                {documentStatus === "none" ? (
                  <div className="relative">
                    <button
                      className="btn h-24 w-full flex-col gap-2 border border-dashed border-base-content/60 btn-outline hover:border-primary hover:bg-primary/5"
                      onClick={handleDocumentUpload}
                    >
                      <CameraIcon className="h-6 w-6 text-base-content/60" />
                      <span className="text-sm text-base-content/80">
                        Take photo of ID or passport
                      </span>
                    </button>
                    <div className="divider my-8 text-xs text-base-content/60">
                      or fill manually
                    </div>
                  </div>
                ) : (
                  <div className="flex h-24 w-full flex-col justify-center gap-2 rounded-lg border-2 border-success bg-success/5">
                    {documentStatus === "extracted" ? (
                      <>
                        <div className="mx-auto flex h-6 w-6 items-center justify-center">
                          <CheckCircleIcon className="h-6 w-6 text-success" />
                        </div>
                        <span className="text-center text-sm font-medium text-success">
                          Extracted successfully - review below
                        </span>
                      </>
                    ) : documentStatus === "extracting" ? (
                      <>
                        <div className="flex justify-center">
                          <div className="loading loading-sm loading-spinner text-base-content/80"></div>
                        </div>
                        <span className="text-center text-sm">
                          Extracting information...
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <div className="loading loading-sm loading-spinner text-base-content/80"></div>
                        </div>
                        <span className="text-center text-sm">
                          Uploading document...
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Manual Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    className="input-bordered input"
                    value={kycInfo.firstName}
                    onChange={(e) =>
                      setKycInfo({ ...kycInfo, firstName: e.target.value })
                    }
                    readOnly={documentStatus === "extracted"}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    className="input-bordered input"
                    value={kycInfo.lastName}
                    onChange={(e) =>
                      setKycInfo({ ...kycInfo, lastName: e.target.value })
                    }
                    readOnly={documentStatus === "extracted"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date of Birth</span>
                  </label>
                  <input
                    type="date"
                    className="input-bordered input"
                    value={kycInfo.dateOfBirth}
                    onChange={(e) =>
                      setKycInfo({ ...kycInfo, dateOfBirth: e.target.value })
                    }
                    readOnly={documentStatus === "extracted"}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Place of Birth</span>
                  </label>
                  <input
                    type="text"
                    className="input-bordered input"
                    value={kycInfo.placeOfBirth}
                    onChange={(e) =>
                      setKycInfo({ ...kycInfo, placeOfBirth: e.target.value })
                    }
                    readOnly={documentStatus === "extracted"}
                    placeholder="City"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Document Number</span>
                </label>
                <input
                  type="text"
                  className="input-bordered input"
                  value={kycInfo.documentNumber}
                  onChange={(e) =>
                    setKycInfo({ ...kycInfo, documentNumber: e.target.value })
                  }
                  readOnly={documentStatus === "extracted"}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nationality</span>
                  </label>
                  <input
                    type="text"
                    className="input-bordered input"
                    value={kycInfo.nationality}
                    onChange={(e) =>
                      setKycInfo({ ...kycInfo, nationality: e.target.value })
                    }
                    readOnly={documentStatus === "extracted"}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Issuing Country</span>
                  </label>
                  <input
                    type="text"
                    className="input-bordered input"
                    value={kycInfo.issuingCountry}
                    onChange={(e) =>
                      setKycInfo({ ...kycInfo, issuingCountry: e.target.value })
                    }
                    readOnly={documentStatus === "extracted"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Issue Date</span>
                  </label>
                  <input
                    type="date"
                    className="input-bordered input"
                    value={kycInfo.issueDate}
                    onChange={(e) =>
                      setKycInfo({ ...kycInfo, issueDate: e.target.value })
                    }
                    readOnly={documentStatus === "extracted"}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Expiry Date</span>
                  </label>
                  <input
                    type="date"
                    className="input-bordered input"
                    value={kycInfo.expiryDate}
                    onChange={(e) =>
                      setKycInfo({ ...kycInfo, expiryDate: e.target.value })
                    }
                    readOnly={documentStatus === "extracted"}
                  />
                </div>
              </div>
            </div>

            <button
              className="btn w-full btn-primary"
              onClick={handleNextStep}
              disabled={!isKycComplete()}
            >
              Continue to Key Activation
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Step 3: Key Activation */}
        {currentStep === "key" && (
          <div className="flex h-full flex-col">
            <div className="flex-1 space-y-6">
              {/* QR Code for Key Machine */}
              <div className="card bg-base-200">
                <div className="card-body text-center">
                  <h3 className="mb-4 text-lg font-bold">Get Your Room Key</h3>
                  <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-xl border-2 border-dashed border-base-content/70 bg-base-100">
                    <QrCodeIcon className="h-16 w-16 text-base-content" />
                  </div>
                  <p className="mb-4 text-sm text-base-content/70">
                    Scan this QR code at the key machine in the lobby to get
                    your physical key card.
                    <br />
                    <strong>Valid for 30 minutes</strong>
                  </p>
                </div>
              </div>

              {/* Apple Wallet Badge */}
              <div className="flex justify-center">
                <button>
                  <img
                    src={AppleWalletBadge}
                    alt="Add to Apple Wallet"
                    className="h-12 cursor-pointer"
                  />
                </button>
              </div>
            </div>

            <button
              className="btn w-full btn-success"
              onClick={() => navigate("/")}
            >
              Complete Check-In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
