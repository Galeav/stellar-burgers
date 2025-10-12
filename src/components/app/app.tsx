import { useCallback, useEffect } from 'react';
import {
  useLocation,
  Location,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';

import { Paths } from '@paths';
import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { useDispatch } from '@store';
import { fetchUser } from '@slices';

import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { background?: Location } | undefined;
  const background = state?.background;

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleModalClose = useCallback(() => navigate(-1), [navigate]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        {/* публичные маршруты */}
        <Route path={Paths.root} element={<ConstructorPage />} />
        <Route path={Paths.feed} element={<Feed />} />

        {/* авторизация (только для разлогиненных) */}
        <Route
          path={Paths.login}
          element={
            <ProtectedRoute unauthOnly>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={Paths.register}
          element={
            <ProtectedRoute unauthOnly>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path={Paths.forgot}
          element={
            <ProtectedRoute unauthOnly>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={Paths.reset}
          element={
            <ProtectedRoute unauthOnly>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        {/* защищенные маршруты */}
        <Route
          path={Paths.profile}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={Paths.profileOrders}
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        {/* полнооконные модалки */}
        <Route
          path={Paths.ingredient()}
          element={<IngredientDetails fullPage />}
        />
        <Route path={Paths.feedOrder()} element={<OrderInfo />} />
        <Route
          path={Paths.profileOrder()}
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {/* модалки */}
      {background && (
        <Routes>
          <Route
            path={Paths.ingredient()}
            element={
              <Modal title='Об ингредиенте' onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={Paths.feedOrder()}
            element={
              <Modal title='Детали заказа' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={Paths.profileOrder()}
            element={
              <ProtectedRoute>
                <Modal title='Ваш заказ' onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
