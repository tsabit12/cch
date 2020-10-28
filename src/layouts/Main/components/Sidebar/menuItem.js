import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PeopleIcon from '@material-ui/icons/People';

import {
  BarChart as BarChartIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  Cancel as CancelIcon
} from '@material-ui/icons';

//for ref level id user
//you can check function getInitialUser in helper.js
export default [
  {
    href: '/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
    user: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    collapse: []
  },
  {
    href: '/user',
    icon: PersonIcon,
    title: 'User',
    user: [1, 3, 4],
    collapse: []
  },
  {
    href: '/tiket',
    icon: AssignmentIcon,
    title: 'Tiket',
    user: [1, 2, 5, 6, 7],
    collapse: []
  },
  {
    href: '/pelanggan',
    icon: PeopleIcon,
    title: 'Pelanggan',
    user: [1, 2, 3, 4, 5, 6, 7],
    collapse: []
  },
  {
    href: '/prod-knowledge',
    icon: LocalLibraryIcon,
    title: 'Product Knowledge',
    user: [1, 2, 3, 4, 5, 6, 7],
    collapse: []
  },
  {
    href: '/x-ray',
    icon: CancelIcon,
    title: 'Gagal X-Ray',
    user: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    collapse: []
  },
  {
    href: null,
    icon: FolderOpenIcon,
    title: 'Laporan',
    user: [], //collapse length > 0 && user must move to array in collapse
    collapse: [
      {href: '/laporan-tiket', title: 'Tiket', user: [1, 2, 3, 4, 6, 7, 8, 9]},
      {href: '/laporan-product', title: 'Produk', user: [1, 2, 3, 4, 6, 7, 8, 9]},
      {href: '/kinerja-cs', title: 'Kinerja CS', user: [1, 2, 3, 5, 4, 6, 7, 8, 9]},
      {href: '/laporan-xray', title: 'X-Ray', user:[1, 2, 8, 3, 9]},
    ]
  },
  {
    href: '/setting',
    icon: SettingsIcon,
    title: 'Pengaturan',
    user: [1],
    collapse: []
  }
]