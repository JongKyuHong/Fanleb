import { Navigate, useRoutes } from 'react-router-dom';
import MainLayout from './layouts/main';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import NotFound from './pages/Page404';
import Main from './pages/Main';
import Items from './pages/Items';
import ItemRegistration from './pages/ItemRegistration';
import SaleRegistration from './pages/SaleRegistration';
import WhosArt from './pages/WhosArt';
import ItemPurchase from './pages/ItemPurchase';
import CreateNFT from './pages/CreateNFT';
import Content from './projectsPages/Content'
import ContentDetail from './projectsPages/ContentDetail'
import ContentDetailModal from './projectsPages/ContentDetailModal'
import SearchResult from './pages/SearchResult';
import Test from './projectsPages/Test';
import Rank from './projectsPages/Rank';

// 화면 라우팅 테이블
export default function Router() {
  return useRoutes([
    {
      path: '/main',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/main" replace /> },
        { path: '', element: <Main /> }
      ]
    },
    // {
    //   path: '/content',
    //   element: <MainLayout />,
    //   children: [
    //     { element: <Navigate to="/content" replace /> },
    //     { path: '', element: <Content /> }
    //   ]
    // },
    {
      path: '/content/:contentId',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/content" replace /> },
        { path: '', element: <Content /> },
        { path: ':collectionId', element: <Content/> },
        { path: 'detail/:detailId', element: <ContentDetailModal/> }

        // { path: '/:collectionId/*', element: <Content/> }
      ]
    },

    {
      path: '/detail/:detailId',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/detail" replace /> },
        { path: '', element: <ContentDetail/> }
      ]
    },
    {
      path: '/search',
      element: <MainLayout />,
      children: [        
        { element: <Navigate to='/search' replace /> },
        { path: '', element: <SearchResult /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/main" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/items',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/items" replace /> },
        { path: '', element: <Items /> },
        { path: 'buy/:tokenId', element: <ItemPurchase /> }
      ]
    },
    {
      path: '/create',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/register" replace /> },
        { path: '', element: <CreateNFT /> },        
      ]
    },    
    {
      path: '/register',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/register" replace /> },
        { path: '', element: <ItemRegistration /> },
        { path: 'sale/:tokenId', element: <SaleRegistration /> }
      ]
    },
    {
      path: '/whosart',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/whosart" replace /> },
        { path: '', element: <WhosArt /> },
        { path: ':address', element: <WhosArt /> }
      ]
    },
    {
      path: '/rank',
      element: <MainLayout />,
      children: [
        { path: '', element: <Rank/>},
      ]
    },
    {
      path: '/test',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/subscribe" replace /> },
        { path: '', element: <Test/>},
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
