
import {
  AppLayout,
  CTASection,
  Explore,
  NewsLetter,
  FeaturedProducts,
  HeroBanner,
  NewArrival,
  ProductCategorySection,
} from '../components';
import { ToastContainer } from 'react-toastify';
export default function Home() {
  // const dispatch = useDispatch();

  // const fetchUserAddress = async () => {
  //   try {
  //     const { data } = await AuthService.addresses(user.user_id);
  //     if (data) dispatch(loadAddresses(data));
  //   } catch (error) {
  //     toast.error('Error while fetching your address');
  //   }
  // };

  // useEffect(() => {
  //   if (!user?.user_id) return;
  //   fetchUserAddress();
  // }, []);

  return (
    <AppLayout>
      <ToastContainer />
      <HeroBanner />
      <ProductCategorySection />
      <CTASection />
      <FeaturedProducts />
      <NewArrival />
      <NewsLetter />
      <Explore />
    </AppLayout>
  );
}
