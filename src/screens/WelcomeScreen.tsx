import { Briefcase, Bus, Car, type LucideIcon, MapPin } from "lucide-react";
import { TopNav } from "~/components/TopNav";

export function WelcomeScreen() {
  return (
    <>
      <TopNav title="Welcome" />

      <div className="bg-gradient-to-b from-primary/15 to-base-200 p-4">
        <div className="mt-4 mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-primary">
            Welcome to your new hometown!
          </h1>
          <p className="mt-2 text-lg text-base-content/80">
            Discover the city's secrets, meet new people, and make this place
            your own.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Card
            icon={MapPin}
            title="Explore the City"
            description="Get key facts and hidden gems to feel right at home."
          />
          <Card
            icon={Bus}
            title="Get Around"
            description="Master local transport like a pro—apps, passes & more."
          />
          <Card
            icon={Car}
            title="Your Ride"
            description="Driving here? Find parking, tolls and car sharing tips."
          />
          <Card
            icon={Briefcase}
            title="Opportunities"
            description="Explore work options, find services and unlock possibilities."
          />
        </div>
      </div>
    </>
  );
}

type CardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

function Card({ icon: Icon, title, description }: CardProps) {
  return (
    <div className="card cursor-pointer bg-base-100 shadow-md select-none active:scale-98">
      <div className="card-body flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <h2 className="card-title">{title}</h2>
        </div>
        <p className="text-sm text-base-content/80">{description}</p>
      </div>
    </div>
  );
}
