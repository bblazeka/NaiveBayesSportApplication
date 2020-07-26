﻿using HockeyDb.Services;
using HockeyDb.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace HockeyDb.Views
{
    /// <summary>
    /// Interaction logic for PlayerPage.xaml
    /// </summary>
    public partial class PlayerPage : BasePage
    {
        private PlayerService m_dbService;
        public PlayerPage()
        {
            InitializeComponent();
        }

        public PlayerPage(PlayerService ps)
        {
            InitializeComponent();
            m_dbService = ps;
            Refresh();
        }

        public override void Refresh()
        {
            var players = m_dbService.GetPlayersWithFlags();
            PlayerCb.ItemsSource = players.OrderBy(player => player.FullName);
            TeamCb.ItemsSource = m_dbService.GetTeams();
            PlayerCb_Copy.ItemsSource = players.OrderBy(player => player.FullName);
            PlayersGrid.ItemsSource = players.OrderBy(player => player.FullName);
            var nations = m_dbService.GetNations();
            NatCb.ItemsSource = nations;
            NatCb_Copy.ItemsSource = nations;
            Nat2Cb.ItemsSource = nations;
            NatFilterCb.ItemsSource = nations;
        }

        private void PlayerCb_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            SeasonsDataGrid.ItemsSource = m_dbService.GetPlayerSeasons(((ComboBox)sender).SelectedItem);
            var player = (((ComboBox)sender).SelectedItem as PlayerViewModel);
            if (player == null)
            {
                return;
            }
            if (player.Position != null)
            {
                GoalsCol.Visibility = player.Position.Equals("G") ? Visibility.Collapsed : Visibility.Visible;
                AssistCol.Visibility = player.Position.Equals("G") ? Visibility.Collapsed : Visibility.Visible;
                PtsCol.Visibility = player.Position.Equals("G") ? Visibility.Collapsed : Visibility.Visible;
                PimCol.Visibility = player.Position.Equals("G") ? Visibility.Collapsed : Visibility.Visible;
                SvsCol.Visibility = player.Position.Equals("G") ? Visibility.Visible : Visibility.Collapsed;
                GAACol.Visibility = player.Position.Equals("G") ? Visibility.Visible : Visibility.Collapsed;
            }

            PositionTb.Text = player.Position;
            NatCb.Text = player.Nation;
            Nat2Cb.Text = player.Nation2;
            BirthplaceTb.Text = player.BirthPlace;
            BirthdateDP.SelectedDate = player.Birthdate;
        }

        private void UpdateBtn_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                foreach (PlayerSeasonViewModel entry in SeasonsDataGrid.Items)
                {
                    m_dbService.UpdatePlayerSeason(entry.SeasonId, entry.Player.PlayerId, entry.Team.TeamId, entry.Nr, entry.GP, entry.Goals, entry.Assists, entry.PIM, entry.GoalsAgainstAvg, entry.SavesPercent);
                }
            }
            catch (InvalidCastException ex)
            {
                // caused by last element being an empty row
                Console.WriteLine(ex);
            }

            var res = m_dbService.UpdatePlayer(NatCb.Text, PositionTb.Text, (PlayerCb.SelectedItem as PlayerViewModel).PlayerId,
                Nat2Cb.Text, BirthplaceTb.Text, BirthdateDP.SelectedDate.GetValueOrDefault());
            RaiseStatusChange(string.Format("Update for player {0}.",(PlayerCb.SelectedItem as PlayerViewModel).FullName), res);
        }

        private void PlayerCb_Copy_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var player = (PlayerViewModel)((ComboBox)sender).SelectedItem;
            if (player != null)
            {
                NameTb.Text = player.FullName;
                IdTb.Text = player.PlayerId.ToString();
            }
        }

        private void ResetBtn_Click(object sender, RoutedEventArgs e)
        {
            IdTb.Text = "";
            NameTb.Text = "";
            PosTb.Text = "";
        }

        private void Insert_Click(object sender, RoutedEventArgs e)
        {
            var res = m_dbService.InsertPlayer(IdTb.Text, NameTb.Text, PosTb.Text, NatCb_Copy.Text);
            RaiseStatusChange(string.Format("Inserted {0} from {1}", NameTb.Text, NatCb_Copy.Text), res);
        }

        private void InsertPlayerTeamTb_Click(object sender, RoutedEventArgs e)
        {
            var res = m_dbService.AddPlayerTeam(IdTb.Text.Length == 0 ? 0 : Convert.ToInt32(IdTb.Text),
                NameTb.Text, TeamCb.SelectedItem, Convert.ToInt32(SeasonCb.SelectedItem));
            RaiseStatusChange(string.Format("Inserted {0} - {1} {2}", NameTb.Text, TeamCb.SelectedItem, SeasonCb.SelectedItem), res);
        }

        private void DeleteBtn_Click(object sender, RoutedEventArgs e)
        {
            var res = m_dbService.DeletePlayerTeam(IdTb.Text.Length == 0 ? 0 : Convert.ToInt32(IdTb.Text),
                NameTb.Text, TeamCb.SelectedItem, Convert.ToInt32(SeasonCb.SelectedItem));
            RaiseStatusChange(string.Format("Deleted {0} - {1} {2}", NameTb.Text, TeamCb.SelectedItem, SeasonCb.SelectedItem), res);
        }

        private void UpdatePlayersBtn_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                foreach (PlayerViewModel entry in PlayersGrid.Items)
                {
                    m_dbService.UpdatePlayer(entry.Nation, entry.Position, entry.PlayerId, entry.Nation2, entry.BirthPlace, entry.Birthdate);
                }
            }
            catch (InvalidCastException ex)
            {
                // caused by last element being an empty row
                Console.WriteLine(ex);
            }
        }

        private void NatFilterCb_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (NatFilterCb.SelectedItem != null)
            {
                string selectedNation = (NatFilterCb.SelectedItem as NationViewModel).NationId;
                PlayerCb.ItemsSource = m_dbService.GetPlayers().Where(p => p.Nation.Equals(selectedNation) ||
                (p.Nation2 != null && p.Nation2.Equals(selectedNation))).ToList();
            }
        }

        private void copySelectedBtn_Click(object sender, RoutedEventArgs e)
        {
            PlayerViewModel player = ((PlayerViewModel)PlayersGrid.SelectedItem);
            NameTb.Text = player.FullName;
            IdTb.Text = player.PlayerId.ToString();
        }

        private void BtnNext_Click(object sender, RoutedEventArgs e)
        {
            PlayerCb.SelectedIndex++;
        }
    }
}