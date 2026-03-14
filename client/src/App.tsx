import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import JoinHome from "./pages/JoinHome";
import InsureHome from "./pages/InsureHome";
import InsureRequest from "./pages/InsureRequest";
import Apply from "./pages/Apply";
import LandingRecruitment from "./pages/LandingRecruitment";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/join" component={JoinHome} />
      <Route path="/insure" component={InsureHome} />
      <Route path="/insure/request" component={InsureRequest} />
      <Route path="/apply" component={Apply} />
      <Route path="/careers" component={LandingRecruitment} />
      <Route path="/my-story" component={LandingRecruitment} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

const TAMPA_BG_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/QAp5dBwcR69Bs4yRELPLtH/tampa_skyline_hero_f0df03fc.webp";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <div className="relative min-h-screen">
            <div
              className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${TAMPA_BG_URL}')`,
                opacity: 0.18,
              }}
              aria-hidden
            />
            <div className="relative z-10">
              <Router />
            </div>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
