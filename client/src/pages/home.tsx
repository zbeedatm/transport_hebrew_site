import { Search, Clock, MapPin, Phone, Calendar, Info, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Announcement, Route } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@assets/generated_images/Modern_bus_transportation_hero_image_190cca24.png";
import mobilePaymentBanner from "@assets/generated_images/Mobile_payment_app_banner_c27c0dda.png";
import routeMapBanner from "@assets/generated_images/Bus_route_map_banner_a651722e.png";
import customerServiceBanner from "@assets/generated_images/Customer_service_banner_7be46267.png";

const QUICK_LINES = [1, 3, 5, 12, 16, 34, 36, 39, 57, 68];

const PROMOTIONAL_BANNERS = [
  {
    id: 1,
    image: mobilePaymentBanner,
    alt: "תשלום בנייד",
    title: "משלמים בנייד",
  },
  {
    id: 2,
    image: routeMapBanner,
    alt: "מפת קווים",
    title: "מפת רשת האוטובוסים",
  },
  {
    id: 3,
    image: customerServiceBanner,
    alt: "שירות לקוחות",
    title: "שירות לקוחות UNBS",
  },
];

const INFO_CARDS = [
  {
    icon: Calendar,
    title: "לוחות זמנים",
    description: "צפו בלוחות הזמנים המעודכנים של כל הקווים",
  },
  {
    icon: Phone,
    title: "שירות לקוחות",
    description: "נשמח לעמוד לשירותכם בכל שאלה",
  },
  {
    icon: Info,
    title: "מידע חשוב",
    description: "הודעות ועדכונים חשובים לנוסעים",
  },
];

const searchFormSchema = z.object({
  origin: z.string().optional(),
  destination: z.string().optional(),
  lineNumber: z.string().optional(),
}).refine((data) => data.origin || data.destination || data.lineNumber, {
  message: "יש להזין לפחות שדה אחד",
  path: ["origin"],
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

export default function Home() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [searchResults, setSearchResults] = useState<Route[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      origin: "",
      destination: "",
      lineNumber: "",
    },
  });

  // Fetch announcements
  const { data: announcements, isLoading: loadingAnnouncements, error: announcementsError } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
  });

  const searchMutation = useMutation({
    mutationFn: async (values: SearchFormValues) => {
      const params = new URLSearchParams();
      if (values.origin) params.append("origin", values.origin);
      if (values.destination) params.append("destination", values.destination);
      if (values.lineNumber) params.append("lineNumber", values.lineNumber);

      const response = await apiRequest(
        "GET",
        `/api/routes/search?${params.toString()}`
      );
      return (await response.json()) as Route[];
    },
    onSuccess: (data) => {
      setSearchResults(data);
      setHasSearched(true);
      if (data.length === 0) {
        toast({
          title: "לא נמצאו תוצאות",
          description: "לא נמצאו קווים התואמים את החיפוש שלך. נסה שוב עם פרמטרים אחרים.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error("Search error:", error);
      toast({
        title: "שגיאה בחיפוש",
        description: "אירעה שגיאה בעת חיפוש הקווים. אנא נסה שנית.",
        variant: "destructive",
      });
      setSearchResults([]);
      setHasSearched(true);
    },
  });

  const handleSearch = (values: SearchFormValues) => {
    searchMutation.mutate(values);
  };

  const handleLineClick = (line: number) => {
    form.setValue("lineNumber", line.toString());
    searchMutation.mutate({ lineNumber: line.toString() });
  };

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % PROMOTIONAL_BANNERS.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prev) =>
      prev === 0 ? PROMOTIONAL_BANNERS.length - 1 : prev - 1
    );
  };

  const formatDateTime = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleString("he-IL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center" data-testid="text-company-name">
            UNBS ש.א.מ.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 text-center">
            שירותי אוטובוסים מאוחדים
          </p>

          {/* Search Form */}
          <Card className="w-full max-w-4xl backdrop-blur-sm bg-card/95">
            <CardContent className="p-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground text-center mb-6">
                  הקלד מס' קו / מוצא / יעד
                </p>
              </div>

              {/* Quick Line Numbers */}
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-6">
                {QUICK_LINES.map((line) => (
                  <Button
                    key={line}
                    variant="outline"
                    size="sm"
                    className="hover-elevate active-elevate-2"
                    onClick={() => handleLineClick(line)}
                    disabled={searchMutation.isPending}
                    data-testid={`button-line-${line}`}
                  >
                    {line}
                  </Button>
                ))}
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="origin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>מאיפה?</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="מוצא"
                                className="pr-10"
                                data-testid="input-origin"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>לאן נוסעים?</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="יעד"
                                className="pr-10"
                                data-testid="input-destination"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lineNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>מספר קו</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="קו"
                                className="pr-10"
                                data-testid="input-line-number"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full md:w-auto"
                    size="lg"
                    disabled={searchMutation.isPending}
                    data-testid="button-search"
                  >
                    {searchMutation.isPending ? (
                      <>
                        <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                        מחפש...
                      </>
                    ) : (
                      <>
                        <Search className="ml-2 h-5 w-5" />
                        חפש
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              {/* Search Results */}
              {hasSearched && searchResults.length > 0 && (
                <div className="mt-6 space-y-3" data-testid="container-search-results">
                  <h3 className="font-semibold">תוצאות חיפוש:</h3>
                  {searchResults.map((route, index) => (
                    <Card key={route.id} className="hover-elevate" data-testid={`card-route-result-${index}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg font-bold text-primary" data-testid={`text-route-line-${index}`}>
                                קו {route.lineNumber}
                              </span>
                              <span className="text-sm text-muted-foreground" data-testid={`text-route-schedule-${index}`}>
                                {route.schedule}
                              </span>
                            </div>
                            <p className="text-sm" data-testid={`text-route-path-${index}`}>
                              {route.origin} ← {route.destination}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {hasSearched && searchResults.length === 0 && (
                <div className="mt-6 p-8 text-center" data-testid="container-empty-results">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">לא נמצאו תוצאות</h3>
                  <p className="text-muted-foreground">
                    לא נמצאו קווים התואמים את החיפוש שלך. נסה שוב עם פרמטרים אחרים.
                  </p>
                </div>
              )}

              <div className="mt-6 text-center">
                <a
                  href="#"
                  className="text-sm text-primary hover:underline"
                  data-testid="link-all-lines"
                >
                  שאר הקווים
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold" data-testid="text-announcements-title">
              הודעות לציבור הנוסעים
            </h2>
          </div>

          {loadingAnnouncements ? (
            <div className="flex items-center justify-center py-12" data-testid="container-announcements-loading">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : announcementsError ? (
            <div className="text-center py-12" data-testid="container-announcements-error">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <p className="text-muted-foreground">אירעה שגיאה בטעינת ההודעות</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {announcements?.slice(0, 2).map((announcement, index) => (
                <Card 
                  key={announcement.id} 
                  className="border-r-4 border-r-primary hover-elevate"
                  data-testid={`card-announcement-${index}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Clock className="h-12 w-12 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-primary" data-testid={`text-announcement-title-${index}`}>
                            {announcement.title}
                          </span>
                          <span className="text-sm text-muted-foreground" data-testid={`text-announcement-time-${index}`}>
                            {formatDateTime(announcement.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm" data-testid={`text-announcement-content-${index}`}>
                          {announcement.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              <img
                src={PROMOTIONAL_BANNERS[currentBannerIndex].image}
                alt={PROMOTIONAL_BANNERS[currentBannerIndex].alt}
                className="w-full h-auto"
                data-testid="img-promotional-banner"
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 -translate-y-1/2 right-4 bg-card/90 backdrop-blur-sm hover-elevate"
              onClick={prevBanner}
              data-testid="button-banner-prev"
            >
              <span className="sr-only">הקודם</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 -translate-y-1/2 left-4 bg-card/90 backdrop-blur-sm hover-elevate"
              onClick={nextBanner}
              data-testid="button-banner-next"
            >
              <span className="sr-only">הבא</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>

            <div className="flex justify-center gap-2 mt-4">
              {PROMOTIONAL_BANNERS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBannerIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentBannerIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover-elevate"
                  }`}
                  aria-label={`באנר ${index + 1}`}
                  data-testid={`button-banner-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Lines Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6" data-testid="text-quick-lines-title">
            קווים בקליק
          </h2>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {QUICK_LINES.map((line) => (
              <Button
                key={line}
                variant="outline"
                className="h-12 text-lg font-semibold hover-elevate active-elevate-2"
                onClick={() => handleLineClick(line)}
                disabled={searchMutation.isPending}
                data-testid={`button-quick-line-${line}`}
              >
                {line}
              </Button>
            ))}
            <Button
              variant="outline"
              className="col-span-5 md:col-span-10 h-12 hover-elevate active-elevate-2"
              data-testid="button-all-lines"
            >
              שאר הקווים
            </Button>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center" data-testid="text-info-title">
            מידע שימושי
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INFO_CARDS.map((card, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <card.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2" data-testid={`text-info-card-title-${index}`}>
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`text-info-card-description-${index}`}>
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Apps */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center" data-testid="text-apps-title">
            האפליקציות שלנו
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-elevate active-elevate-2 rounded-lg overflow-hidden inline-block"
              data-testid="link-google-play"
            >
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/he_badge_web_generic.png"
                alt="הורד מ-Google Play"
                className="h-16"
              />
            </a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-elevate active-elevate-2 rounded-lg overflow-hidden inline-block"
              data-testid="link-app-store"
            >
              <img
                src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/he-il?size=250x83"
                alt="הורד מ-App Store"
                className="h-16"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold" data-testid="text-footer-copyright">
              © כל הזכויות שמורות לחברת UNBS - שירותי אוטובוסים מאוחדים
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">
                מדיניות פרטיות
              </a>
              <span>•</span>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">
                תנאי שימוש
              </a>
              <span>•</span>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-accessibility">
                הצהרת נגישות
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
