import classNames from "classnames";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BathIcon,
  BedIcon,
  CalendarIcon,
  CameraIcon,
  CheckCircleIcon,
  ChefHatIcon,
  ChevronRightIcon,
  HomeIcon,
  ImageIcon,
  LoaderCircleIcon,
  type LucideIcon,
  SofaIcon,
  WashingMachineIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

import { TopNav } from "~/components/TopNav";

type ReportStep = 1 | 2 | 3 | 4;

type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
};

type IssueType = {
  id: string;
  name: string;
  categoryId: string;
};

type AppointmentSlot = {
  id: string;
  date: string;
  time: string;
  available: boolean;
};

type PhotoState = "uploading" | "uploaded";

export function ReportScreen() {
  const [currentStep, setCurrentStep] = useState<ReportStep>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedIssue, setSelectedIssue] = useState<string>("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoStates, setPhotoStates] = useState<PhotoState[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories: Category[] = [
    { id: "kitchen", name: "Kitchen", icon: ChefHatIcon },
    { id: "bathroom", name: "Bathroom", icon: BathIcon },
    { id: "bedroom", name: "Bedroom", icon: BedIcon },
    { id: "living", name: "Living Room", icon: SofaIcon },
    { id: "laundry", name: "Laundry", icon: WashingMachineIcon },
    { id: "general", name: "General", icon: HomeIcon },
  ];

  const issueTypes: IssueType[] = [
    { id: "plumbing", name: "Plumbing Issue", categoryId: "kitchen" },
    { id: "appliance", name: "Appliance Not Working", categoryId: "kitchen" },
    { id: "electrical", name: "Electrical Problem", categoryId: "kitchen" },
    { id: "shower", name: "Shower/Bathtub Issue", categoryId: "bathroom" },
    { id: "toilet", name: "Toilet Problem", categoryId: "bathroom" },
    { id: "heating", name: "Heating/AC Issue", categoryId: "bedroom" },
    { id: "lighting", name: "Lighting Problem", categoryId: "bedroom" },
    { id: "window", name: "Window/Door Issue", categoryId: "living" },
    { id: "washer", name: "Washing Machine", categoryId: "laundry" },
    { id: "dryer", name: "Dryer Issue", categoryId: "laundry" },
    { id: "maintenance", name: "General Maintenance", categoryId: "general" },
    { id: "cleaning", name: "Cleaning Request", categoryId: "general" },
  ];

  const appointmentSlots: AppointmentSlot[] = [
    { id: "1", date: "Today", time: "2:00 PM - 4:00 PM", available: true },
    { id: "2", date: "Today", time: "4:00 PM - 6:00 PM", available: false },
    { id: "3", date: "Tomorrow", time: "9:00 AM - 11:00 AM", available: true },
    { id: "4", date: "Tomorrow", time: "2:00 PM - 4:00 PM", available: true },
    { id: "5", date: "Friday", time: "10:00 AM - 12:00 PM", available: true },
    { id: "6", date: "Friday", time: "2:00 PM - 4:00 PM", available: true },
  ];

  const filteredIssues = issueTypes.filter(
    (issue) => issue.categoryId === selectedCategory,
  );

  // Get display names for summary
  const selectedCategoryName =
    categories.find((c) => c.id === selectedCategory)?.name || "";
  const selectedIssueName =
    issueTypes.find((i) => i.id === selectedIssue)?.name || "";
  const selectedAppointmentSlot = appointmentSlots.find(
    (a) => a.id === selectedAppointment,
  );

  const canSubmit = selectedAppointment !== "";

  // Validation for continue button on each step
  const canContinueFromStep = () => {
    switch (currentStep) {
      case 1:
        return selectedCategory !== "";
      case 2:
        return selectedIssue !== "";
      case 3:
        return true; // Description is optional on step 3
      case 4:
        return canSubmit;
      default:
        return false;
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as ReportStep);
    }
  };

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as ReportStep);
    }
  };

  // Auto-advance steps when selections are made
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedIssue(""); // Reset issue selection when category changes
    setTimeout(() => setCurrentStep(2), 300); // Small delay for UX
  };

  const handleIssueSelect = (issueId: string) => {
    setSelectedIssue(issueId);
    setTimeout(() => setCurrentStep(3), 300);
  };

  const handlePhotoAdd = () => {
    // Mock photo addition - in real app would open camera/gallery
    const mockFile = new File([""], "photo.jpg", { type: "image/jpeg" });
    const newPhotos = [...photos, mockFile];
    const newStates = [...photoStates, "uploading" as PhotoState];
    const photoIndex = newPhotos.length - 1; // Capture the specific index

    setPhotos(newPhotos);
    setPhotoStates(newStates);

    // Simulate upload delay for this specific photo
    setTimeout(() => {
      setPhotoStates((prev) => {
        const updated = [...prev];
        // Only update if this index still exists and is still uploading
        if (updated[photoIndex] === "uploading") {
          updated[photoIndex] = "uploaded";
        }
        return updated;
      });
    }, 1000);
  };

  const handlePhotoRemove = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
    setPhotoStates(photoStates.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Mock submission - in real app would send to backend
    setIsSubmitted(true);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0">
        <TopNav title="Report a Problem" />
      </div>

      <div className="flex flex-1 flex-col overflow-auto">
        <div className="flex flex-1 flex-col p-4">
          {/* Progress Indicator - Hidden when submitted */}
          {!isSubmitted && (
            <div className="mb-6">
              <span className="text-sm text-base-content/70">
                Step {currentStep} of 4
              </span>
              <progress
                className="progress w-full progress-primary"
                value={currentStep}
                max="4"
              />
            </div>
          )}

          {/* Summary Confirmation */}
          {isSubmitted ? (
            <div className="flex flex-1 flex-col justify-center text-center">
              <div className="mb-8">
                <CheckCircleIcon className="mx-auto mb-6 h-20 w-20 text-success" />
                <h1 className="mb-3 text-2xl font-bold text-success">
                  Report Submitted!
                </h1>
              </div>

              <div className="rounded-box border border-base-300 bg-base-100 p-6 text-left shadow">
                <h2 className="mb-4 text-lg font-semibold">Summary</h2>

                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="text-base-content/70">Area</span>
                    <span className="font-medium">{selectedCategoryName}</span>
                  </div>

                  <div className="flex items-start justify-between">
                    <span className="text-base-content/70">Issue</span>
                    <span className="font-medium">{selectedIssueName}</span>
                  </div>

                  {description && (
                    <div className="flex items-start justify-between">
                      <span className="text-base-content/70">Description</span>
                      <span className="max-w-[60%] text-right font-medium">
                        {description}
                      </span>
                    </div>
                  )}

                  {photos.length > 0 && (
                    <div className="flex items-start justify-between">
                      <span className="text-base-content/70">Photos</span>
                      <span className="font-medium">{photos.length}</span>
                    </div>
                  )}

                  {selectedAppointmentSlot && (
                    <div className="flex items-start justify-between">
                      <span className="text-base-content/70">Appointment</span>
                      <span className="text-right font-medium">
                        {selectedAppointmentSlot.date}
                        <br />
                        <span className="text-sm text-base-content/60">
                          {selectedAppointmentSlot.time}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-base-content/60">
                  Reference: #RP-{Date.now().toString().slice(-6)}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Category Selection */}
              {currentStep === 1 && (
                <div>
                  <h2 className="mb-3 text-lg font-semibold">
                    What area needs attention?
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={classNames(
                          "cursor-pointer rounded-box border p-4 transition-all",
                          selectedCategory === category.id
                            ? "border-primary bg-primary/10"
                            : "hover:border-base-400 border-base-300",
                        )}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <category.icon className="h-8 w-8" />
                          <span className="text-sm font-medium">
                            {category.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Issue Type Selection */}
              {currentStep === 2 && (
                <div>
                  <h2 className="mb-3 text-lg font-semibold">
                    What's the specific issue?
                  </h2>
                  <div className="space-y-2">
                    {filteredIssues.map((issue) => (
                      <button
                        key={issue.id}
                        onClick={() => handleIssueSelect(issue.id)}
                        className={classNames(
                          "flex w-full cursor-pointer items-center justify-between rounded-box border p-3 transition-all",
                          selectedIssue === issue.id
                            ? "border-primary bg-primary/10"
                            : "hover:border-base-400 border-base-300",
                        )}
                      >
                        <span>{issue.name}</span>
                        <ChevronRightIcon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Description and Photos */}
              {currentStep === 3 && (
                <div>
                  <h2 className="mb-3 text-lg font-semibold">
                    Describe the issue
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Description</span>
                      </label>
                      <textarea
                        className="textarea-bordered textarea h-32 w-full"
                        placeholder="Please describe the issue in detail..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Photos</span>
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {photos.map((_, index) => (
                          <div
                            key={index}
                            className="group relative aspect-square"
                          >
                            <div className="flex h-full w-full items-center justify-center rounded-box border border-base-300 bg-base-200">
                              {photoStates[index] === "uploading" ? (
                                <LoaderCircleIcon className="h-6 w-6 animate-spin text-base-content/50" />
                              ) : (
                                <ImageIcon className="h-6 w-6 text-base-content/50" />
                              )}
                            </div>
                            {photoStates[index] === "uploaded" && (
                              <button
                                onClick={() => handlePhotoRemove(index)}
                                className="absolute -top-1 -right-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-base-content/10 hover:bg-base-content/20"
                              >
                                <XIcon className="h-3 w-3 text-base-content/70" />
                              </button>
                            )}
                          </div>
                        ))}
                        {photos.length < 6 && (
                          <button
                            onClick={handlePhotoAdd}
                            className="hover:border-base-400 flex aspect-square cursor-pointer flex-col items-center justify-center rounded-box border-2 border-dashed border-base-300 transition-colors"
                          >
                            <CameraIcon className="mb-1 h-6 w-6" />
                            <span className="text-xs">Add Photo</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Appointment Scheduling */}
              {currentStep === 4 && (
                <div>
                  <h2 className="mb-3 text-lg font-semibold">
                    Select appointment time
                  </h2>
                  <div className="space-y-2">
                    {appointmentSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() =>
                          slot.available && setSelectedAppointment(slot.id)
                        }
                        disabled={!slot.available}
                        className={classNames(
                          "flex w-full items-center justify-between rounded-box border p-3 transition-all",
                          !slot.available
                            ? "cursor-not-allowed border-base-300 bg-base-100 opacity-50"
                            : selectedAppointment === slot.id
                              ? "cursor-pointer border-primary bg-primary/10"
                              : "hover:border-base-400 cursor-pointer border-base-300",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <CalendarIcon className="h-4 w-4" />
                          <div className="text-left">
                            <div className="font-medium">{slot.date}</div>
                            <div className="text-sm text-base-content/70">
                              {slot.time}
                            </div>
                          </div>
                        </div>
                        {!slot.available && (
                          <span className="text-xs text-error">
                            Unavailable
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      {!isSubmitted && (
        <div className="shrink-0 border-t border-base-300 bg-base-100 p-4">
          <div className="flex gap-3">
            {currentStep > 1 && (
              <button onClick={handleBack} className="btn btn-ghost">
                <ArrowLeftIcon className="h-4 w-4" />
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button
                onClick={handleContinue}
                disabled={!canContinueFromStep()}
                className="btn flex-1 btn-primary"
              >
                Continue
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="btn flex-1 btn-primary"
              >
                Submit Report
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
