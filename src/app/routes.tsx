import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { WelcomePage } from "./pages/WelcomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { BarPage } from "./pages/BarPage";
import { CoffeCirclePage } from "./pages/CoffeeCirclePage";
import { ProfilePage } from "./pages/ProfilePage";
import { BrewCategoryPage } from "./pages/BrewCategoryPage";
import { BrewingPage } from "./pages/BrewingPage";
import { SimpleBrewingPage } from "./pages/SimpleBrewingPage";
import { BrewRatingPage } from "./pages/BrewRatingPage";
import { DeviceSettingsPage } from "./pages/DeviceSettingsPage";
import { BrewDetailPage } from "./pages/BrewDetailPage";
import { CurveLibraryPage } from "./pages/CurveLibraryPage";
import { ProfileInfoPage } from "./pages/ProfileInfoPage";
import { MyPostsPage } from "./pages/MyPostsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { HistoryPage } from "./pages/HistoryPage";
import { LanguagePage } from "./pages/LanguagePage";
import { DeviceSelectionPage } from "./pages/DeviceSelectionPage";
import { DeviceConnectionPage } from "./pages/DeviceConnectionPage";
import { MyBadgesPage } from "./pages/MyBadgesPage";
import { RankingPage } from "./pages/RankingPage";
import { CoffeeRecommendationPage } from "./pages/CoffeeRecommendationPage";
import { CoffeeBeanDetailPage } from "./pages/CoffeeBeanDetailPage";
import { PublishBrewingPlanPage } from "./pages/PublishBrewingPlanPage";

export const router = createBrowserRouter([
  { path: "/", Component: WelcomePage },
  { path: "/login", Component: LoginPage },
  { path: "/register", Component: RegisterPage },
  {
    path: "/home",
    Component: Layout,
    children: [
      { index: true, Component: BarPage },
      { path: "coffee-circle", Component: CoffeCirclePage },
      { path: "profile", Component: ProfilePage },
    ],
  },
  { path: "/brew/category", Component: BrewCategoryPage },
  { path: "/brew/brewing", Component: BrewingPage },
  { path: "/brew/simple", Component: SimpleBrewingPage },
  { path: "/brew/rating", Component: BrewRatingPage },
  { path: "/device-settings", Component: DeviceSettingsPage },
  { path: "/device-selection", Component: DeviceSelectionPage },
  { path: "/device-connection", Component: DeviceConnectionPage },
  { path: "/brew/:id", Component: BrewDetailPage },
  { path: "/curve-library", Component: CurveLibraryPage },
  { path: "/profile-info", Component: ProfileInfoPage },
  { path: "/my-posts", Component: MyPostsPage },
  { path: "/my-badges", Component: MyBadgesPage },
  { path: "/ranking", Component: RankingPage },
  { path: "/coffee-recommendation", Component: CoffeeRecommendationPage },
  { path: "/coffee-bean/:id", Component: CoffeeBeanDetailPage },
  { path: "/publish-brewing-plan", Component: PublishBrewingPlanPage },
  { path: "/settings", Component: SettingsPage },
  { path: "/history", Component: HistoryPage },
  { path: "/language", Component: LanguagePage },
]);
